import { describe, it, expect } from 'vitest';
import { computeRegistrationStatus, getPublicConfig } from '@/config/public-config';
import type { PublicPiccConfig } from '@/types/registration';

const baseConfig = (overrides?: Partial<PublicPiccConfig>): PublicPiccConfig => ({
  serverTime: new Date('2026-08-20T12:00:00+07:00').toISOString(),
  environment: 'preview',
  registration: {
    openAt: '2026-08-19T00:00:00+07:00',
    closeAt: '2026-09-15T23:59:59+07:00',
    allowSubmissions: true,
    explicitlyDisabled: false,
  },
  teamSize: { min: 3, max: 4, approvalStatus: 'approved' },
  challengeSelection: { mode: 'single' },
  timeline: [],
  ...overrides,
});

describe('computeRegistrationStatus', () => {
  it('publishes the approved 3–4 member fallback range', () => {
    expect(getPublicConfig().teamSize).toMatchObject({ min: 3, max: 4, approvalStatus: 'approved' });
  });

  it('returns not_configured when dates are missing', () => {
    const config = baseConfig({ registration: { openAt: null, closeAt: null, allowSubmissions: false, explicitlyDisabled: false } });
    expect(computeRegistrationStatus(config)).toBe('not_configured');
  });

  it('returns not_configured when openAt >= closeAt', () => {
    const config = baseConfig({
      registration: { openAt: '2026-09-15T00:00:00+07:00', closeAt: '2026-08-19T00:00:00+07:00', allowSubmissions: true, explicitlyDisabled: false },
    });
    expect(computeRegistrationStatus(config)).toBe('not_configured');
  });

  it('returns manually_disabled when explicitlyDisabled', () => {
    const config = baseConfig({ registration: { ...baseConfig().registration, explicitlyDisabled: true, allowSubmissions: false } });
    expect(computeRegistrationStatus(config)).toBe('manually_disabled');
  });

  it('returns manually_disabled when allowSubmissions is false', () => {
    const config = baseConfig({ registration: { ...baseConfig().registration, allowSubmissions: false } });
    expect(computeRegistrationStatus(config)).toBe('manually_disabled');
  });

  it('returns not_open when before openAt even if submissions disallowed server-side', () => {
    const config = baseConfig({
      serverTime: new Date('2026-08-18T12:00:00+07:00').toISOString(),
      registration: { ...baseConfig().registration, allowSubmissions: false },
    });
    expect(computeRegistrationStatus(config)).toBe('not_open');
  });

  it('returns closed when after closeAt even if submissions disallowed server-side', () => {
    const config = baseConfig({
      serverTime: new Date('2026-09-16T12:00:00+07:00').toISOString(),
      registration: { ...baseConfig().registration, allowSubmissions: false },
    });
    expect(computeRegistrationStatus(config)).toBe('closed');
  });

  it('returns manually_disabled when admin pauses inside the window', () => {
    const config = baseConfig({
      serverTime: new Date('2026-08-25T12:00:00+07:00').toISOString(),
      registration: { ...baseConfig().registration, explicitlyDisabled: true, allowSubmissions: false },
    });
    expect(computeRegistrationStatus(config)).toBe('manually_disabled');
  });

  it('returns not_open when before openAt', () => {
    const config = baseConfig({ serverTime: new Date('2026-08-18T23:59:00+07:00').toISOString() });
    expect(computeRegistrationStatus(config)).toBe('not_open');
  });

  it('returns open when between openAt and closeAt', () => {
    const config = baseConfig();
    expect(computeRegistrationStatus(config)).toBe('open');
  });

  it('returns closed when after closeAt', () => {
    const config = baseConfig({ serverTime: new Date('2026-09-16T00:00:00+07:00').toISOString() });
    expect(computeRegistrationStatus(config)).toBe('closed');
  });

  it('returns open exactly at openAt boundary', () => {
    const config = baseConfig({ serverTime: new Date('2026-08-19T00:00:00+07:00').toISOString() });
    expect(computeRegistrationStatus(config)).toBe('open');
  });

  it('returns open one second before closeAt', () => {
    const config = baseConfig({ serverTime: new Date('2026-09-15T23:59:58+07:00').toISOString() });
    expect(computeRegistrationStatus(config)).toBe('open');
  });

  it('returns closed exactly at closeAt', () => {
    const config = baseConfig({ serverTime: new Date('2026-09-15T23:59:59+07:00').toISOString() });
    expect(computeRegistrationStatus(config)).toBe('closed');
  });
});
