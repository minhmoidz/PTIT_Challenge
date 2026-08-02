import type { VercelRequest, VercelResponse } from '@vercel/node';
import { RegistrationSchema, mapValidationIssuesToFieldErrors } from './_lib/validation';
import { appendRegistration, appendMember } from './_lib/sheets';
import { getIdempotencyResult, setIdempotencyResult } from './_lib/idempotency';
import { checkRateLimit } from './_lib/rate-limit';

const MAX_BODY_SIZE = 65536;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: { code: 'METHOD_NOT_ALLOWED', message: 'Only POST allowed', requestId: '' },
    });
  }

  const bodySize = JSON.stringify(req.body).length;
  if (bodySize > MAX_BODY_SIZE) {
    return res.status(413).json({
      success: false,
      error: { code: 'PAYLOAD_TOO_LARGE', message: 'Body exceeds 64KB', requestId: '' },
    });
  }

  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? 'unknown';
  const rateOk = await checkRateLimit(clientIp);
  if (!rateOk) {
    return res.status(429).json({
      success: false,
      error: { code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.', requestId: '' },
    });
  }

  const idempotencyKey = req.headers['idempotency-key'] as string;
  if (!idempotencyKey) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Missing Idempotency-Key header.', requestId: '' },
    });
  }

  const priorResult = await getIdempotencyResult(idempotencyKey);
  if (priorResult) {
    return res.status(200).json(priorResult);
  }

  const registrationEnabled = process.env.PICC_REGISTRATION_ENABLED !== 'false';
  const openAt = process.env.PICC_REGISTRATION_OPEN_AT ? new Date(process.env.PICC_REGISTRATION_OPEN_AT) : null;
  const closeAt = process.env.PICC_REGISTRATION_CLOSE_AT ? new Date(process.env.PICC_REGISTRATION_CLOSE_AT) : null;
  const now = new Date();
  const withinWindow =
    Boolean(openAt && closeAt) &&
    !isNaN(openAt!.getTime()) &&
    !isNaN(closeAt!.getTime()) &&
    openAt! < closeAt! &&
    now >= openAt! &&
    now <= closeAt!;

  if (!registrationEnabled || !withinWindow) {
    return res.status(409).json({
      success: false,
      error: { code: 'REGISTRATION_NOT_OPEN', message: 'Đăng ký hiện không mở.', requestId: `req_${Date.now()}` },
    });
  }

  const parsed = RegistrationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Dữ liệu chưa hợp lệ.',
        requestId: `req_${Date.now()}`,
        fieldErrors: mapValidationIssuesToFieldErrors(parsed.error.issues),
      },
    });
  }

  const data = parsed.data;
  const submissionId = `PICC-2026-${String(Date.now()).slice(-6)}`;
  const submittedAt = new Date().toISOString();

  try {
    await appendRegistration({
      submissionId,
      submittedAt,
      teamName: data.teamName,
      teamSize: data.teamSize,
      categories: data.challengeCategories,
      previousCompetitions: data.previousCompetitions,
      featuredProject: data.featuredProject,
      expectations: data.expectations,
      companyExperience: data.companyExperience,
      leaderEmail: data.members[0]!.email,
      leaderPhone: data.members[0]!.phone,
    });

    for (const member of data.members) {
      await appendMember({
        submissionId,
        role: member.role,
        fullName: member.fullName,
        studentId: member.studentId,
        major: member.major,
        email: member.email,
        phone: member.phone,
      });
    }

    const result = {
      success: true as const,
      data: { submissionId, submittedAt },
    };

    await setIdempotencyResult(idempotencyKey, result);
    return res.status(201).json(result);
  } catch (err) {
    console.error('[Registrations] Storage error:', err);
    return res.status(503).json({
      success: false,
      error: { code: 'STORAGE_UNAVAILABLE', message: 'Dịch vụ lưu trữ tạm thời không khả dụng. Vui lòng thử lại sau.', requestId: `req_${Date.now()}` },
    });
  }
}
