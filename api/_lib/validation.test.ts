import { describe, expect, it } from 'vitest';
import { RegistrationSchema } from './validation';

const member = (index: number) => ({
  role: index === 0 ? 'leader' as const : 'member' as const,
  fullName: `Member ${index + 1}`,
  studentId: `B20DCCN10${index}`,
  major: 'Công nghệ thông tin',
  email: `member-${index}@ptit.edu.vn`,
  phone: `091234568${index}`,
});

const payload = (teamSize: number) => ({
  teamName: 'PICC Team',
  teamSize,
  challengeCategories: ['technology'],
  featuredProject: 'Dự án thử nghiệm',
  expectations: 'Kỳ vọng học hỏi',
  companyExperience: 'none' as const,
  members: Array.from({ length: teamSize }, (_, index) => member(index)),
  commitments: {
    truthfulInformation: true as const,
    mediaConsent: true as const,
    rulesAccepted: true as const,
    privacyAcknowledged: true as const,
  },
  honeypot: '',
  formStartedAt: new Date().toISOString(),
});

describe('RegistrationSchema', () => {
  it.each([3, 4])('accepts a %i-member team', (teamSize) => {
    expect(RegistrationSchema.safeParse(payload(teamSize)).success).toBe(true);
  });

  it('rejects a five-member team', () => {
    expect(RegistrationSchema.safeParse(payload(5)).success).toBe(false);
  });
});
