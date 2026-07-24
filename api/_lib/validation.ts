import { z } from 'zod';

export const MemberSchema = z.object({
  role: z.enum(['leader', 'member']),
  fullName: z.string().trim().min(1),
  studentId: z.string().trim().min(1),
  major: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(1),
});

export const RegistrationSchema = z.object({
  teamName: z.string().trim().min(2).max(80),
  teamSize: z.number().int().min(3).max(5),
  challengeCategories: z.array(z.string()).min(1),
  otherChallengeCategory: z.string().optional(),
  previousCompetitions: z.string().max(500).optional(),
  featuredProject: z.string().trim().min(1).max(1500),
  expectations: z.string().trim().min(1).max(1000),
  companyExperience: z.enum(['none', 'previous', 'ongoing']),
  members: z.array(MemberSchema).min(3).max(5),
  commitments: z.object({
    truthfulInformation: z.literal(true),
    mediaConsent: z.literal(true),
    rulesAccepted: z.literal(true),
    privacyAcknowledged: z.literal(true),
  }),
  honeypot: z.string().max(0),
  formStartedAt: z.string(),
}).refine(
  (data) => data.members.length === data.teamSize,
  { message: 'Members count must match teamSize' },
).refine(
  (data) => data.members[0]?.role === 'leader',
  { message: 'First member must be leader' },
);
