import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { serverEnv } from '../config/env';

/**
 * Optional email service. When SMTP_HOST is unset the service is disabled and
 * every call is a no-op, so registration is never blocked by emailing.
 * The transporter is created lazily on the first send.
 */
let transporter: Transporter | null | undefined;
let warned = false;

const getTransporter = (): Transporter | null => {
  if (transporter !== undefined) return transporter;

  if (!serverEnv.SMTP_HOST) {
    if (!warned) {
      console.warn('[Email] SMTP not configured — confirmation emails are disabled.');
      warned = true;
    }
    transporter = null;
    return transporter;
  }

  const port = serverEnv.SMTP_PORT ?? 587;
  transporter = nodemailer.createTransport({
    host: serverEnv.SMTP_HOST,
    port,
    secure: port === 465,
    auth: serverEnv.SMTP_USER ? { user: serverEnv.SMTP_USER, pass: serverEnv.SMTP_PASSWORD ?? '' } : undefined,
  });

  return transporter;
};

export interface RegistrationConfirmationParams {
  to: string;
  teamName: string;
  leaderName: string;
  registrationCode: string;
  submittedAt: string;
}

const safe = (v: string) => v.replace(/[\r\n<>]/g, '');

export const sendRegistrationConfirmation = async (
  params: RegistrationConfirmationParams,
): Promise<boolean> => {
  const t = getTransporter();
  if (!t) return false;

  const from = serverEnv.MAIL_FROM || `Ban Tổ Chức PICC 2026 <${serverEnv.SMTP_USER ?? 'noreply@ptit.edu.vn'}>`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; color: #0F2A52;">
      <h2 style="color: #E11414; margin: 0 0 16px;">PTIT Innovation Catalyst Challenge 2026</h2>
      <p style="font-size: 15px; line-height: 1.7;">Xin chào <strong>${safe(params.leaderName)}</strong>,</p>
      <p style="font-size: 15px; line-height: 1.7;">
        Ban Tổ chức đã ghi nhận hồ sơ đăng ký của đội <strong>${safe(params.teamName)}</strong>.
      </p>
      <table style="margin: 24px 0; border-collapse: collapse; font-size: 15px;">
        <tr>
          <td style="padding: 8px 16px; background: #F3F6FB; border: 1px solid #E7EDF6; color: #516987;">Mã đăng ký</td>
          <td style="padding: 8px 16px; border: 1px solid #E7EDF6; font-weight: bold; letter-spacing: 0.04em;">${safe(params.registrationCode)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 16px; background: #F3F6FB; border: 1px solid #E7EDF6; color: #516987;">Thời gian nộp</td>
          <td style="padding: 8px 16px; border: 1px solid #E7EDF6;">${safe(params.submittedAt)}</td>
        </tr>
      </table>
      <p style="font-size: 15px; line-height: 1.7;">
        Vui lòng <strong>lưu lại mã đăng ký</strong> để đối chiếu. Kết quả xác nhận, đề bài và lộ trình các
        giai đoạn sẽ được Ban Tổ chức cập nhật trên Fanpage chính thức của cuộc thi.
      </p>
      <p style="font-size: 15px; line-height: 1.7; margin-top: 24px;">Trân trọng,<br/>Ban Tổ Chức PICC 2026</p>
    </div>
  `;

  try {
    await t.sendMail({
      from,
      to: params.to,
      subject: `[PICC 2026] Xác nhận đăng ký thành công - ${params.registrationCode}`,
      html,
    });
    return true;
  } catch (err) {
    console.error('[Email] Failed to send confirmation email:', err);
    return false;
  }
};
