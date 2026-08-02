import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { serverEnv } from './config/env';
import { CompetitionStatusService } from './services/competitionStatus';
import { RegistrationService } from './services/registrationService';
import { AuthService, type AdminUser } from './services/authService';
import { dbStore } from './db/store';
import { assertDatabaseReachable, prisma } from './db/prisma';
import { competitionData } from '../src/data/competition';
import type { RegistrationFormValues } from '../src/types/registration';
import { RegistrationSchema, mapValidationIssuesToFieldErrors } from '../api/_lib/validation';
import { toDbTeamCompetitionStatus } from './db/mappers';
import { getClientIp } from './utils/clientIp';

/* ── Idempotency Store ── */
const idempotencyStore = new Map<string, { result: unknown; expiresAt: number }>();
const IDEMPOTENCY_TTL = 24 * 60 * 60 * 1000;

const getIdempotencyResult = (key: string): unknown | null => {
  const entry = idempotencyStore.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    idempotencyStore.delete(key);
    return null;
  }
  return entry.result;
};

const setIdempotencyResult = (key: string, result: unknown): void => {
  idempotencyStore.set(key, { result, expiresAt: Date.now() + IDEMPOTENCY_TTL });
};

const app = express();
const PORT = serverEnv.PORT || 3001;

// Only our own nginx sits in front of this process, so exactly one hop is
// trusted. Leaving this unset would make req.ip the proxy's address; trusting
// the whole chain would let a client forge it.
app.set('trust proxy', 1);

/* ── 1. Security & Body Parser Middleware ── */
// The SPA is served from the same origin as the API by the nginx in front of
// this process, so browsers send no cross-origin requests in normal operation
// and CORS_ORIGIN can stay unset. Set it only when the app is served from a
// different origin than the API.
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:80',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:80',
  ...(serverEnv.CORS_ORIGIN ? serverEnv.CORS_ORIGIN.split(',').map((o) => o.trim()) : []),
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.some((o) => o === '*' || origin === o);
      if (isAllowed) return callback(null, true);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: '128kb' }));
app.use(cookieParser());

/* ── Simple in-memory sliding-window rate limiter ── */
const rateLimitBuckets = new Map<string, number[]>();
const rateLimit = (windowMs: number, max: number) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const key = `${req.path}:${getClientIp(req)}`;
  const now = Date.now();
  const hits = (rateLimitBuckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= max) {
    return res.status(429).json({
      success: false,
      error: { code: 'RATE_LIMITED', message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau ít phút.' },
    });
  }
  hits.push(now);
  rateLimitBuckets.set(key, hits);
  next();
};

/* ── Admin auth guard ── */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      adminUser?: AdminUser;
    }
  }
}

const requireAdminAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const header = req.headers.authorization;
  const bearer = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : undefined;
  const token = bearer ?? req.cookies?.picc_session;
  const user = await AuthService.verifyToken(token);
  if (!user) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.' },
    });
  }
  req.adminUser = user;
  next();
};

const requireAdminPermission =
  (...permissions: string[]) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = req.adminUser;
    if (!user || !AuthService.hasAnyPermission(user, permissions)) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Tài khoản không có quyền thực hiện thao tác này.' },
      });
    }
    next();
  };

/* ── Security Headers Middleware ── */
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

/* ── Swagger UI /docs & OpenAPI Specification ── */
const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'PICC 2026 Core API Documentation',
    version: '1.0.0',
    description: 'Tài liệu Swagger UI tương tác dành cho Backend API Cuộc thi PICC 2026 (PTIT Innovation & Code Challenge)',
  },
  servers: [
    { url: '/', description: 'Current Server Host' }
  ],
  paths: {
    '/health': {
      get: {
        summary: 'Kiểm tra trạng thái server (Healthcheck)',
        tags: ['System'],
        responses: { '200': { description: 'Server hoạt động bình thường' } }
      }
    },
    '/health/ready': {
      get: {
        summary: 'Kiểm tra kết nối Database',
        tags: ['System'],
        responses: { '200': { description: 'Database sẵn sàng' } }
      }
    },
    '/api/v1/public/competition/status': {
      get: {
        summary: 'Lấy trạng thái cuộc thi & thời gian server',
        tags: ['Public API'],
        responses: { '200': { description: 'Thành công' } }
      }
    },
    '/api/v1/public/milestones': {
      get: {
        summary: 'Lấy mốc thời gian cuộc thi (Timeline)',
        tags: ['Public API'],
        responses: { '200': { description: 'Thành công' } }
      }
    },
    '/api/v1/public/prizes': {
      get: {
        summary: 'Lấy cơ cấu giải thưởng',
        tags: ['Public API'],
        responses: { '200': { description: 'Thành công' } }
      }
    },
    '/api/v1/public/teams': {
      get: {
        summary: 'Lấy danh sách đội thi đã xuất bản',
        tags: ['Public API'],
        parameters: [
          { name: 'category', in: 'query', schema: { type: 'string' }, description: 'Nhóm bài toán' },
          { name: 'status', in: 'query', schema: { type: 'string' }, description: 'Trạng thái đội thi' },
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Từ khóa tìm kiếm' }
        ],
        responses: { '200': { description: 'Thành công' } }
      }
    },
    '/api/v1/public/teams/{slug}': {
      get: {
        summary: 'Chi tiết hồ sơ đội thi theo Slug',
        tags: ['Public API'],
        parameters: [
          { name: 'slug', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'Thành công' }, '404': { description: 'Không tìm thấy đội thi' } }
      }
    },
    '/api/v1/public/registrations': {
      post: {
        summary: 'Gửi đơn đăng ký đội thi mới',
        tags: ['Public API'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  teamName: { type: 'string', example: 'Code Warriors PTIT' },
                  teamSize: { type: 'number', example: 3 },
                  challengeCategories: { type: 'array', items: { type: 'string' }, example: ['AI/ML'] }
                }
              }
            }
          }
        },
        responses: { '201': { description: 'Đăng ký thành công' }, '400': { description: 'Dữ liệu không hợp lệ' } }
      }
    },
    '/api/v1/admin/auth/login': {
      post: {
        summary: 'Đăng nhập Quản trị viên (BTC Admin)',
        tags: ['Admin API'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', example: 'iec@ptit.edu.vn' },
                  password: { type: 'string', example: 'admin123' }
                }
              }
            }
          }
        },
        responses: { '200': { description: 'Đăng nhập thành công' }, '401': { description: 'Thất bại' } }
      }
    },
    '/api/v1/admin/dashboard/summary': {
      get: {
        summary: 'Thống kê tổng quan Dashboard Admin',
        tags: ['Admin API'],
        responses: { '200': { description: 'Thành công' } }
      }
    },
    '/api/v1/admin/registrations': {
      get: {
        summary: 'Lấy toàn bộ danh sách đơn đăng ký',
        tags: ['Admin API'],
        responses: { '200': { description: 'Thành công' } }
      }
    },
    '/api/v1/admin/registrations/export': {
      get: {
        summary: 'Xuất danh sách đăng ký ra file CSV / Excel',
        tags: ['Admin API'],
        responses: { '200': { description: 'File CSV' } }
      }
    }
  }
};

app.get('/api-docs.json', (_req, res) => {
  res.json(openApiSpec);
});

app.get('/docs', (_req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>PICC 2026 Core API Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  <style>
    html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
    *, *:before, *:after { box-sizing: inherit; }
    body { margin: 0; background: #fafafa; }
    .topbar { display: none !important; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js" charset="UTF-8"></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: '/api-docs.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
      });
    };
  </script>
</body>
</html>
  `);
});


/* ── 2. Health Check Endpoints ── */
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'PICC 2026 Core API' });
});

app.get('/health/ready', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ready', database: 'connected', timestamp: new Date().toISOString() });
  } catch {
    res.status(503).json({ status: 'not_ready', database: 'disconnected', timestamp: new Date().toISOString() });
  }
});

/* ── 3. PUBLIC API ENDPOINTS (/api/v1/public/*) ── */

// 3.1 Competition Status & Server Time (Single Source of Truth)
app.get('/api/v1/public/competition/status', (_req, res) => {
  const status = CompetitionStatusService.getStatus();
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.json({ success: true, data: status });
});

// Legacy backward compatibility endpoint for existing hooks
app.get('/api/public-config', (_req, res) => {
  const status = CompetitionStatusService.getStatus();
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.json({
    serverTime: status.serverTime,
    environment: serverEnv.NODE_ENV,
    registration: {
      openAt: status.openAt,
      closeAt: status.closeAt,
      allowSubmissions: status.registrationAvailable,
      explicitlyDisabled: status.currentStatus === 'paused',
      statusMessage: status.statusMessage,
    },
    teamSize: {
      min: competitionData.teamRules.min,
      max: competitionData.teamRules.max,
      approvalStatus: 'approved',
    },
    challengeSelection: { mode: 'multiple', maxSelections: 5 },
    timeline: competitionData.timeline,
  });
});

// 3.2 Public Milestones / Timeline
app.get('/api/v1/public/milestones', (_req, res) => {
  res.json({ success: true, data: competitionData.timeline });
});

// 3.4 Public Prizes
app.get('/api/v1/public/prizes', (_req, res) => {
  res.json({ success: true, data: competitionData.prizes });
});

// 3.5 Public Benefits
app.get('/api/v1/public/benefits', (_req, res) => {
  res.json({ success: true, data: competitionData.qualifierBenefits });
});

// 3.6 Public Announcements
app.get('/api/v1/public/announcements', (_req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'ann-01',
        title: 'Chính thức khởi động Cuộc thi PICC 2026 — Rise Beyond Limits',
        slug: 'khoi-dong-picc-2026',
        summary: 'Sân chơi đổi mới sáng tạo đỉnh cao dành riêng cho Sinh viên PTIT.',
        publishedAt: '2026-07-20T08:00:00Z',
      },
    ],
  });
});

// 3.7 Public Partners & Mentors
app.get('/api/v1/public/partners', (_req, res) => {
  res.json({ success: true, data: competitionData.partners });
});

app.get('/api/v1/public/mentors', (_req, res) => {
  res.json({ success: true, data: competitionData.mentors || [] });
});

// 3.8 Public Teams List
app.get('/api/v1/public/teams', async (req, res) => {
  const category = req.query.category as string;
  const status = req.query.status as string | 'all' | undefined;
  const search = req.query.search as string;

  if (status && status !== 'all' && !toDbTeamCompetitionStatus(status)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Trạng thái đội thi không hợp lệ.',
      },
    });
  }

  const teams = await dbStore.getPublicTeams(category, status ?? undefined, search);
  const finalists = teams.filter((t) => t.competitionStatus === 'finalist' || t.competitionStatus === 'winner');

  res.json({
    success: true,
    data: {
      teams,
      total: teams.length,
      hasMore: false,
      finalists,
    },
  });
});

// 3.9 Public Team Detail by Slug
app.get('/api/v1/public/teams/:slug', async (req, res) => {
  const { slug } = req.params;
  const team = await dbStore.getPublicTeamBySlug(slug);

  if (!team) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Hồ sơ đội thi không tồn tại hoặc chưa được xuất bản.' },
    });
  }

  res.json({ success: true, data: team });
});

// 3.10 Public Registration Submission Handler (shared by current + legacy routes)
const handleRegistrationSubmit = async (req: express.Request, res: express.Response) => {
  const idempotencyKey = req.headers['idempotency-key'] as string;
  if (idempotencyKey) {
    const cached = getIdempotencyResult(idempotencyKey);
    if (cached) {
      return res.status(201).json(cached);
    }
  }

  const parsed = RegistrationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Dữ liệu đăng ký chưa hợp lệ.',
        requestId: `req_${Date.now()}`,
        fieldErrors: mapValidationIssuesToFieldErrors(parsed.error.issues),
      },
    });
  }

  const clientIp = getClientIp(req);

  try {
    const payload = parsed.data as RegistrationFormValues;
    const result = await RegistrationService.processRegistration(payload, clientIp);
    if (idempotencyKey) {
      setIdempotencyResult(idempotencyKey, result);
    }
    res.status(201).json(result);
  } catch (err: unknown) {
    const errorObj = err as {
      status?: number;
      code?: string;
      message?: string;
      fieldErrors?: Record<string, string>;
    };
    const statusCode = errorObj.status ?? 500;
    res.status(statusCode).json({
      success: false,
      error: {
        code: statusCode >= 500 ? 'INTERNAL_ERROR' : errorObj.code || 'VALIDATION_ERROR',
        message:
          statusCode >= 500
            ? 'Hệ thống đang gặp sự cố. Hồ sơ của bạn vẫn được lưu tạm trên thiết bị, vui lòng thử lại sau ít phút.'
            : errorObj.message || 'Dữ liệu đăng ký chưa hợp lệ.',
        requestId: `req_${Date.now()}`,
        ...(errorObj.fieldErrors ? { fieldErrors: errorObj.fieldErrors } : {}),
      },
    });
  }
};

const registrationRateLimit = rateLimit(60_000, 5);

app.post('/api/v1/public/registrations', registrationRateLimit, handleRegistrationSubmit);
// Legacy backward compatibility endpoint for registration submit
app.post('/api/registrations', registrationRateLimit, handleRegistrationSubmit);

/* ── 4. ADMIN-READY ENDPOINTS (/api/v1/admin/*) ── */

// 4.1 Admin Auth Login (Hardened & Robust Login)
app.post('/api/v1/admin/auth/login', rateLimit(60_000, 10), async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Vui lòng cung cấp email và mật khẩu.' },
    });
  }

  const result = await AuthService.login(email, password);

  if (!result) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Email hoặc mật khẩu không chính xác.' },
    });
  }

  res.cookie('picc_session', result.token, {
    httpOnly: true,
    secure: serverEnv.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ success: true, data: result });
});

// 4.1b Session self-check — returns the authenticated admin (cookie or Bearer).
app.get('/api/v1/admin/auth/me', requireAdminAuth, (_req, res) => {
  res.json({ success: true, data: { user: _req.adminUser } });
});

// 4.1c Logout — clears the httpOnly session cookie.
app.post('/api/v1/admin/auth/logout', (_req, res) => {
  res.clearCookie('picc_session', { httpOnly: true, secure: serverEnv.NODE_ENV === 'production', sameSite: 'lax', path: '/' });
  res.json({ success: true });
});

// 4.2 Admin Dashboard Summary Metrics
app.get('/api/v1/admin/dashboard/summary', requireAdminAuth, requireAdminPermission('dashboard.read'), async (_req, res) => {
  const registrations = await dbStore.getRegistrations();

  res.json({
    success: true,
    data: {
      totalRegistrations: registrations.length,
      submittedCount: registrations.filter((r) => r.status === 'SUBMITTED').length,
      verifiedCount: registrations.filter((r) => r.status === 'VERIFIED').length,
      publicProfilesCount: await dbStore.countTeamProfiles(),
      publishedTeamsCount: await dbStore.countPublishedTeams(),
    },
  });
});

// 4.3 Admin List Registrations
app.get('/api/v1/admin/registrations', requireAdminAuth, requireAdminPermission('registration.read'), async (_req, res) => {
  const list = await dbStore.getRegistrations();
  res.json({ success: true, data: list });
});

// 4.3b Admin Review a Registration (verify / reject / request changes)
const REVIEWABLE_STATUSES = [
  'SUBMITTED',
  'UNDER_REVIEW',
  'NEEDS_REVISION',
  'VERIFIED',
  'REJECTED',
  'WITHDRAWN',
] as const;

app.patch('/api/v1/admin/registrations/:id/status', requireAdminAuth, requireAdminPermission('registration.review'), async (req, res) => {
  const { status, rejectionReason } = req.body ?? {};

  if (!REVIEWABLE_STATUSES.includes(status)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: `Trạng thái không hợp lệ. Cho phép: ${REVIEWABLE_STATUSES.join(', ')}.`,
      },
    });
  }

  if (status === 'REJECTED' && !String(rejectionReason ?? '').trim()) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Vui lòng nhập lý do từ chối hồ sơ.' },
    });
  }

  const registrationId = String(req.params.id);
  const updated = await dbStore.updateRegistrationStatus(
    registrationId,
    status,
    req.adminUser!.id,
    rejectionReason,
  );

  if (!updated) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Không tìm thấy hồ sơ đăng ký.' },
    });
  }

  res.json({ success: true, data: updated });
});

// 4.3c Admin Team Profiles — every profile, not just the published ones
app.get('/api/v1/admin/teams', requireAdminAuth, requireAdminPermission('publicTeam.read'), async (_req, res) => {
  const teams = await dbStore.getAllTeamProfiles();
  res.json({ success: true, data: { teams, total: teams.length } });
});

// 4.4 Admin Get Competition Time & Override Configuration
app.get('/api/v1/admin/competition/config', requireAdminAuth, requireAdminPermission('competition.read'), (_req, res) => {
  const status = CompetitionStatusService.getStatus();
  res.json({ success: true, data: status });
});

// 4.5 Admin Update Competition Time & Override Configuration
app.patch('/api/v1/admin/competition/config', requireAdminAuth, requireAdminPermission('competition.update'), async (req, res) => {
  const { openAt, closeAt, statusOverride } = req.body ?? {};

  try {
    await CompetitionStatusService.updateConfig({ openAt, closeAt, statusOverride });
  } catch (err: unknown) {
    const e = err as { status?: number; code?: string; message?: string };
    return res.status(e.status ?? 400).json({
      success: false,
      error: { code: e.code ?? 'VALIDATION_ERROR', message: e.message ?? 'Cấu hình không hợp lệ.' },
    });
  }

  await dbStore.addAuditLog('UPDATE_COMPETITION_CONFIG', 'Competition', 'picc-2026', {
    actorUserId: req.adminUser!.id,
    afterData: { openAt, closeAt, statusOverride },
  });

  res.json({ success: true, data: CompetitionStatusService.getStatus() });
});

// 4.6 Helper function to sanitize CSV values against formula injection
const sanitizeCsvCell = (val: string | number | boolean | undefined | null): string => {
  if (val === undefined || val === null) return '""';
  let str = String(val).replace(/"/g, '""');
  if (str.startsWith('=') || str.startsWith('+') || str.startsWith('-') || str.startsWith('@')) {
    str = `'` + str;
  }
  return `"${str}"`;
};

// 4.7 Admin Export All Registrations to Excel CSV Endpoint
app.get('/api/v1/admin/registrations/export', requireAdminAuth, requireAdminPermission('registration.export'), async (_req, res) => {
  const registrations = await dbStore.getRegistrations();
  dbStore.addAuditLog('EXPORT_REGISTRATIONS', 'Registration', 'all');

  const headers = [
    'Mã Đăng Ký',
    'Tên Đội Thi',
    'Số Thành Viên',
    'Nhóm Bài Toán',
    'Trạng Thái',
    'Thời Gian Nộp',
    'Đội Trưởng - Họ Tên',
    'Đội Trưởng - Mã SV',
    'Đội Trưởng - Ngành',
    'Đội Trưởng - Email',
    'Đội Trưởng - SĐT',
    'Dự Án Nổi Bật',
    'Kinh Nghiệm',
    'Thành Viên 2',
    'Thành Viên 3',
    'Thành Viên 4',
    'Thành Viên 5',
    'Xác Nhận Cam Kết',
  ];

  const rows = registrations.map((r) => {
    const d = r.data;
    const captain = d.members?.[0] || { fullName: '', studentId: '', major: '', email: '', phone: '' };

    const member2 = d.members?.[1] ? `${d.members[1].fullName} (${d.members[1].studentId} - ${d.members[1].email})` : '';
    const member3 = d.members?.[2] ? `${d.members[2].fullName} (${d.members[2].studentId} - ${d.members[2].email})` : '';
    const member4 = d.members?.[3] ? `${d.members[3].fullName} (${d.members[3].studentId} - ${d.members[3].email})` : '';
    const member5 = d.members?.[4] ? `${d.members[4].fullName} (${d.members[4].studentId} - ${d.members[4].email})` : '';

    return [
      sanitizeCsvCell(r.registrationCode),
      sanitizeCsvCell(d.teamName),
      sanitizeCsvCell(d.teamSize),
      sanitizeCsvCell(d.challengeCategories?.join('; ')),
      sanitizeCsvCell(r.status),
      sanitizeCsvCell(r.submittedAt),
      sanitizeCsvCell(captain.fullName),
      sanitizeCsvCell(captain.studentId),
      sanitizeCsvCell(captain.major),
      sanitizeCsvCell(captain.email),
      sanitizeCsvCell(captain.phone),
      sanitizeCsvCell(d.featuredProject),
      sanitizeCsvCell(d.companyExperience),
      sanitizeCsvCell(member2),
      sanitizeCsvCell(member3),
      sanitizeCsvCell(member4),
      sanitizeCsvCell(member5),
      sanitizeCsvCell(d.commitments ? 'Đã Chấp Nhận 3 Cam Kết' : 'Chưa Chấp Nhận'),
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.map(sanitizeCsvCell).join(','), ...rows].join('\r\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename=PICC_2026_Danh_Sach_Doi_Thi_${Date.now()}.csv`);
  res.status(200).send(csvContent);
});

/* ── 5. Global Error Handler (must be registered last) ── */
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const known = err as { status?: number; code?: string; message?: string };
  const statusCode = known.status ?? 500;
  console.error('[Server] Unhandled error:', err);
  res.status(statusCode).json({
    success: false,
    error: {
      code: statusCode >= 500 ? 'INTERNAL_ERROR' : known.code || 'VALIDATION_ERROR',
      message:
        statusCode >= 500
          ? 'Hệ thống đang gặp sự cố. Vui lòng thử lại sau ít phút.'
          : known.message || 'Yêu cầu không hợp lệ.',
      requestId: `req_${Date.now()}`,
    },
  });
});

/* ── 6. Start Express API Server ── */
const start = async () => {
  // Refuse to serve if the database is unreachable: a booting server that
  // accepts registrations it cannot store is worse than one that fails.
  await assertDatabaseReachable();
  await CompetitionStatusService.hydrate();
  await AuthService.bootstrapFromEnv();

  app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 PICC 2026 Production API Backend`);
    console.log(`- Running at: http://localhost:${PORT}`);
    console.log(`- Public Status API: http://localhost:${PORT}/api/v1/public/competition/status`);
    console.log(`- Public Teams API:  http://localhost:${PORT}/api/v1/public/teams`);
    console.log(`- Registration API:  http://localhost:${PORT}/api/v1/public/registrations`);
    console.log(`==================================================\n`);
  });
};

start().catch((err) => {
  console.error('[Startup] Failed to start API server:', err instanceof Error ? err.message : err);
  process.exit(1);
});
