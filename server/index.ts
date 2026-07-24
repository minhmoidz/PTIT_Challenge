import express from 'express';
import cors from 'cors';
import { RegistrationSchema } from '../api/_lib/validation';
import { appendRegistration, appendMember } from '../api/_lib/sheets';
import { getIdempotencyResult, setIdempotencyResult } from '../api/_lib/idempotency';
import { checkRateLimit } from '../api/_lib/rate-limit';
import type { PublicPiccConfig } from '../src/types/registration';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:80' }));
app.use(express.json({ limit: '64kb' }));

app.get('/api/public-config', (_req, res) => {
  const config: PublicPiccConfig = {
    serverTime: new Date().toISOString(),
    environment: (process.env.VERCEL_ENV as 'preview' | 'production') ?? 'preview',
    registration: {
      openAt: process.env.PICC_REGISTRATION_OPEN_AT ?? null,
      closeAt: process.env.PICC_REGISTRATION_CLOSE_AT ?? null,
      allowSubmissions: process.env.PICC_REGISTRATION_ENABLED === 'true',
      explicitlyDisabled: process.env.PICC_REGISTRATION_ENABLED !== 'true',
    },
    teamSize: { min: 3, max: 5, approvalStatus: 'unresolved' },
    challengeSelection: { mode: 'single' },
    timeline: [],
  };
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.json(config);
});

app.post('/api/registrations', async (req, res) => {
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? req.ip ?? 'unknown';

  const rateOk = await checkRateLimit(clientIp);
  if (!rateOk) {
    return res.status(429).json({
      success: false,
      error: { code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.', requestId: `req_${Date.now()}` },
    });
  }

  const idempotencyKey = req.headers['idempotency-key'] as string;
  if (!idempotencyKey) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Missing Idempotency-Key header.', requestId: `req_${Date.now()}` },
    });
  }

  const priorResult = await getIdempotencyResult(idempotencyKey);
  if (priorResult) return res.status(200).json(priorResult);

  const registrationEnabled = process.env.PICC_REGISTRATION_ENABLED === 'true';
  if (!registrationEnabled) {
    return res.status(409).json({
      success: false,
      error: { code: 'REGISTRATION_NOT_OPEN', message: 'Đăng ký hiện không mở.', requestId: `req_${Date.now()}` },
    });
  }

  const parsed = RegistrationSchema.safeParse(req.body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.');
      fieldErrors[path] = issue.message;
    }
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Dữ liệu chưa hợp lệ.', requestId: `req_${Date.now()}`, fieldErrors },
    });
  }

  const data = parsed.data;
  const submissionId = `PICC-2026-${String(Date.now()).slice(-6)}`;
  const submittedAt = new Date().toISOString();

  try {
    await appendRegistration({
      submissionId, submittedAt, teamName: data.teamName, teamSize: data.teamSize,
      categories: data.challengeCategories, previousCompetitions: data.previousCompetitions,
      featuredProject: data.featuredProject, expectations: data.expectations,
      companyExperience: data.companyExperience, leaderEmail: data.members[0].email, leaderPhone: data.members[0].phone,
    });

    for (const member of data.members) {
      await appendMember({
        submissionId, role: member.role, fullName: member.fullName,
        studentId: member.studentId, major: member.major, email: member.email, phone: member.phone,
      });
    }

    const result = { success: true as const, data: { submissionId, submittedAt } };
    await setIdempotencyResult(idempotencyKey, result);
    return res.status(201).json(result);
  } catch (err) {
    console.error('[Registrations] Storage error:', err);
    return res.status(503).json({
      success: false,
      error: { code: 'STORAGE_UNAVAILABLE', message: 'Dịch vụ lưu trữ tạm thời không khả dụng.', requestId: `req_${Date.now()}` },
    });
  }
});

app.listen(PORT, () => {
  console.log(`[PICC API] Server running on http://localhost:${PORT}`);
});
