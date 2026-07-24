import type { PublicPiccConfig, RegistrationStatus } from '@/types/registration';

const fallbackConfig: PublicPiccConfig = {
  serverTime: new Date().toISOString(),
  environment: 'preview',
  registration: {
    openAt: null,
    closeAt: null,
    allowSubmissions: false,
    explicitlyDisabled: true,
    statusMessage: 'Thông tin đăng ký sẽ được cập nhật.',
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

  if (registration.explicitlyDisabled) return 'manually_disabled';
  if (!registration.openAt || !registration.closeAt) return 'not_configured';

  const now = new Date(config.serverTime || Date.now());
  const openAt = new Date(registration.openAt);
  const closeAt = new Date(registration.closeAt);

  if (isNaN(openAt.getTime()) || isNaN(closeAt.getTime()) || openAt >= closeAt) return 'not_configured';
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

export const getEffectiveServerTime = (baseServerTime: string, clockOffsetMs: number): Date => {
  return new Date(Date.now() + clockOffsetMs);
};
