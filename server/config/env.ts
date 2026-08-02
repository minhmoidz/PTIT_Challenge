import fs from 'fs';
import path from 'path';
import { z } from 'zod';

/**
 * Loads .env for local development. In production the process environment is
 * already populated (Docker, CI, hosting platform), so a missing file is fine.
 * Real environment variables always win over the file.
 */
const loadDotEnv = () => {
  const envFile = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envFile)) return;
  try {
    process.loadEnvFile(envFile);
  } catch (err) {
    console.warn('[Env] Could not read .env:', err instanceof Error ? err.message : err);
  }
};

loadDotEnv();

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required — registrations are stored in Postgres.'),
  DIRECT_URL: z.string().optional(),
  /**
   * Extra allowed origins, comma-separated. Normally unnecessary: nginx serves
   * the SPA and the API from one origin, so requests are same-origin.
   */
  CORS_ORIGIN: z.string().optional(),
  /** Signs admin session tokens. Rotating it invalidates every active session. */
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters.'),
  /** Optional: seeds the first SUPER_ADMIN when the users table is empty. */
  PICC_ADMIN_EMAIL: z.string().email().optional(),
  PICC_ADMIN_PASSWORD: z.string().min(12, 'PICC_ADMIN_PASSWORD must be at least 12 characters.').optional(),
  JWT_EXPIRES_IN: z.string().default('1d'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),
  STORAGE_PROVIDER: z.enum(['local', 's3']).default('local'),
  PICC_REGISTRATION_OPEN_AT: z.string().default('2026-08-01T00:00:00+07:00'),
  PICC_REGISTRATION_CLOSE_AT: z.string().default('2026-08-15T23:59:59+07:00'),
  PICC_REGISTRATION_ENABLED: z.string().default('true'),
  /** Optional SMTP — confirmation emails are disabled when SMTP_HOST is unset. */
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  MAIL_FROM: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('\n[Env] Invalid server configuration:\n');
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
  }
  console.error('\n[Env] Fix your .env file and restart.\n');
  process.exit(1);
}

export const serverEnv = parsed.data;
