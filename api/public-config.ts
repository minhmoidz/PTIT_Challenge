import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { PublicPiccConfig } from '../src/types/registration';

const config: PublicPiccConfig = {
  serverTime: new Date().toISOString(),
  environment: (process.env.VERCEL_ENV as 'preview' | 'production') ?? 'preview',
  registration: {
    openAt: process.env.PICC_REGISTRATION_OPEN_AT ?? null,
    closeAt: process.env.PICC_REGISTRATION_CLOSE_AT ?? null,
    allowSubmissions: process.env.PICC_REGISTRATION_ENABLED === 'true',
    explicitlyDisabled: process.env.PICC_REGISTRATION_ENABLED !== 'true',
    statusMessage: process.env.PICC_REGISTRATION_STATUS_MESSAGE,
  },
  teamSize: {
    min: 3,
    max: 5,
    approvalStatus: 'unresolved',
  },
  challengeSelection: {
    mode: 'single',
  },
  timeline: [],
};

export default function handler(_req: VercelRequest, res: VercelResponse) {
  config.serverTime = new Date().toISOString();
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(config);
}
