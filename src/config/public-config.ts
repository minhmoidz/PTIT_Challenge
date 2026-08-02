import type { PublicPiccConfig, RegistrationStatus } from '@/types/registration';
import { competitionData } from '@/data/competition';

const fallbackConfig: PublicPiccConfig = {
  serverTime: new Date().toISOString(),
  environment: 'preview',
  registration: {
    openAt: '2026-08-01T00:00:00+07:00',
    closeAt: '2026-08-15T23:59:59+07:00',
    allowSubmissions: true,
    explicitlyDisabled: false,
    statusMessage: 'Cổng đăng ký mở từ 01/08/2026 đến 15/08/2026.',
  },
  teamSize: {
    min: competitionData.teamRules.min,
    max: competitionData.teamRules.max,
    approvalStatus: 'approved',
  },
  challengeSelection: {
    mode: 'multiple',
    maxSelections: 5,
  },
  timeline: [],
};

let cachedConfig: PublicPiccConfig | null = null;

export const setPublicConfig = (config: PublicPiccConfig): void => {
  if (config && typeof config === 'object' && 'registration' in config && config.registration) {
    cachedConfig = config;
  }
};

export const getPublicConfig = (): PublicPiccConfig => {
  return cachedConfig ?? fallbackConfig;
};

export const computeRegistrationStatus = (config?: PublicPiccConfig | null): RegistrationStatus => {
  if (!config || !config.registration) return 'not_configured';
  const { registration } = config;

  if (!registration.openAt || !registration.closeAt) return 'not_configured';

  const now = new Date(config.serverTime || Date.now());
  const openAt = new Date(registration.openAt);
  const closeAt = new Date(registration.closeAt);

  if (isNaN(openAt.getTime()) || isNaN(closeAt.getTime()) || openAt >= closeAt) return 'not_configured';
  if (registration.explicitlyDisabled) return 'manually_disabled';
  if (!registration.allowSubmissions) return 'manually_disabled';
  if (now < openAt) return 'not_open';
  if (now >= openAt && now < closeAt) return 'open';
  return 'closed';
};

export const computeClockOffset = (serverTime: string): number => {
  const server = new Date(serverTime).getTime();
  const client = Date.now();
  return server - client;
};

export const getEffectiveServerTime = (_baseServerTime: string, clockOffsetMs: number): Date => {
  return new Date(Date.now() + clockOffsetMs);
};
