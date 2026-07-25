import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().optional(),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  JWT_SECRET: z.string().default('picc2026-super-secret-jwt-key-change-in-prod-789213!'),
  JWT_EXPIRES_IN: z.string().default('1d'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),
  STORAGE_PROVIDER: z.enum(['local', 's3']).default('local'),
  PICC_REGISTRATION_OPEN_AT: z.string().default('2026-08-01T00:00:00+07:00'),
  PICC_REGISTRATION_CLOSE_AT: z.string().default('2026-08-15T23:59:59+07:00'),
  PICC_REGISTRATION_ENABLED: z.string().default('true'),
});

export const serverEnv = envSchema.parse(process.env);
