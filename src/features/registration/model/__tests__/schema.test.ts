import { describe, it, expect } from 'vitest';
import { createRegistrationSchema } from '@/features/registration/model/schema';

const config = { teamMin: 3, teamMax: 4, challengeMode: 'single' as const };

const validData = {
  teamName: 'Team Innovation',
  teamSize: 3,
  challengeCategories: ['technology'],
  featuredProject: 'A great project description',
  expectations: 'We expect to learn a lot',
  companyExperience: 'none',
  members: [
    { role: 'leader' as const, fullName: 'Nguyễn Văn A', studentId: 'B20DCCN001', major: 'CNTT', email: 'a@example.com', phone: '0912345678' },
    { role: 'member' as const, fullName: 'Nguyễn Văn B', studentId: 'B20DCMR002', major: 'Marketing', email: 'b@example.com', phone: '0912345679' },
    { role: 'member' as const, fullName: 'Nguyễn Văn C', studentId: 'B20DCPT003', major: 'Truyền thông', email: 'c@example.com', phone: '0912345680' },
  ],
  commitments: {
    truthfulInformation: true as const,
    mediaConsent: true as const,
    rulesAccepted: true as const,
    privacyAcknowledged: true as const,
  },
  honeypot: '',
  formStartedAt: new Date().toISOString(),
};

describe('Registration Schema', () => {
  const schema = createRegistrationSchema(config);

  it('passes with valid data', () => {
    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('fails with empty team name', () => {
    const result = schema.safeParse({ ...validData, teamName: '' });
    expect(result.success).toBe(false);
  });

  it('fails with team name too short', () => {
    const result = schema.safeParse({ ...validData, teamName: 'A' });
    expect(result.success).toBe(false);
  });

  it('fails with invalid email', () => {
    const result = schema.safeParse({ ...validData, members: [{ ...validData.members[0], email: 'invalid' }, ...validData.members.slice(1)] });
    expect(result.success).toBe(false);
  });

  it('fails with invalid phone', () => {
    const result = schema.safeParse({ ...validData, members: [{ ...validData.members[0], phone: '123' }, ...validData.members.slice(1)] });
    expect(result.success).toBe(false);
  });

  it('accepts a four-member team', () => {
    const fourthMember = {
      role: 'member' as const,
      fullName: 'Nguyễn Văn D',
      studentId: 'B20DCCN004',
      major: 'Thiết kế',
      email: 'd@example.com',
      phone: '0912345681',
    };
    const result = schema.safeParse({
      ...validData,
      teamSize: 4,
      members: [...validData.members, fourthMember],
    });
    expect(result.success).toBe(true);
  });

  it('rejects a five-member team', () => {
    const members = Array.from({ length: 5 }, (_, index) => ({
      ...validData.members[Math.min(index, 2)],
      role: index === 0 ? 'leader' as const : 'member' as const,
      studentId: `B20DCCN10${index}`,
      email: `member-${index}@example.com`,
      phone: `091234568${index}`,
    }));
    const result = schema.safeParse({ ...validData, teamSize: 5, members });
    expect(result.success).toBe(false);
  });

  it('fails when member count does not match teamSize', () => {
    const result = schema.safeParse({ ...validData, teamSize: 4 });
    expect(result.success).toBe(false);
  });

  it('fails when honeypot is not empty', () => {
    const result = schema.safeParse({ ...validData, honeypot: 'bot' });
    expect(result.success).toBe(false);
  });

  it('fails when commitments are not accepted', () => {
    const result = schema.safeParse({ ...validData, commitments: { truthfulInformation: false, mediaConsent: false, rulesAccepted: false, privacyAcknowledged: false } });
    expect(result.success).toBe(false);
  });

  it('fails with empty featured project', () => {
    const result = schema.safeParse({ ...validData, featuredProject: '' });
    expect(result.success).toBe(false);
  });

  it('passes with optional previous competitions', () => {
    const result = schema.safeParse({ ...validData, previousCompetitions: 'Some experience' });
    expect(result.success).toBe(true);
  });
});
