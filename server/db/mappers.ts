import type { ChallengeCategory, ConsentType, EnterpriseExperience, Prisma } from '@prisma/client';
import type { RegistrationFormValues } from '../../src/types/registration';
import type { DBRegistrationRecord } from './store';

const CATEGORY_TO_DB: Record<string, ChallengeCategory> = {
  business: 'BUSINESS',
  technology: 'TECHNOLOGY',
  marketing: 'MARKETING',
  communications: 'COMMUNICATIONS',
  other: 'OTHER',
};

const CATEGORY_FROM_DB: Record<ChallengeCategory, string> = {
  BUSINESS: 'business',
  TECHNOLOGY: 'technology',
  MARKETING: 'marketing',
  COMMUNICATIONS: 'communications',
  OTHER: 'other',
};

const EXPERIENCE_TO_DB: Record<string, EnterpriseExperience> = {
  none: 'NONE',
  previous: 'PREVIOUS',
  ongoing: 'ONGOING',
};

const EXPERIENCE_FROM_DB: Record<EnterpriseExperience, 'none' | 'previous' | 'ongoing'> = {
  NONE: 'none',
  PREVIOUS: 'previous',
  ONGOING: 'ongoing',
};

export const toDbCategory = (value?: string): ChallengeCategory =>
  CATEGORY_TO_DB[String(value ?? '').toLowerCase()] ?? 'OTHER';

export const toDbExperience = (value?: string): EnterpriseExperience =>
  EXPERIENCE_TO_DB[String(value ?? '').toLowerCase()] ?? 'NONE';

/**
 * The form collects four commitment checkboxes and four optional public-consent
 * choices; the schema stores each as its own audited row.
 */
export const buildConsentRows = (
  values: RegistrationFormValues,
): Array<{ consentType: ConsentType; accepted: boolean }> => {
  const c = values.commitments;
  const p = values.publicConsent;

  return [
    { consentType: 'INFORMATION_ACCURACY', accepted: Boolean(c?.truthfulInformation) },
    { consentType: 'MEDIA_USE', accepted: Boolean(c?.mediaConsent) },
    { consentType: 'RULES_ACCEPTANCE', accepted: Boolean(c?.rulesAccepted) },
    { consentType: 'PUBLIC_TEAM_PROFILE', accepted: Boolean(p?.shareTeamProfile) },
    { consentType: 'PUBLIC_MEMBER_NAMES', accepted: Boolean(p?.shareMemberNames) },
    { consentType: 'PUBLIC_MEMBER_PHOTOS', accepted: Boolean(p?.shareLogoOrPhotos) },
    { consentType: 'PUBLIC_PROJECT_SUMMARY', accepted: Boolean(p?.shareProjectSummary) },
  ];
};

type RegistrationWithRelations = Prisma.RegistrationGetPayload<{
  include: { members: true; consents: true };
}>;

/**
 * Rebuilds the shape the admin UI and CSV export already consume, so the
 * storage swap stays invisible to callers.
 */
export const toRegistrationRecord = (row: RegistrationWithRelations): DBRegistrationRecord => {
  const consentOf = (type: ConsentType) => row.consents.find((c) => c.consentType === type)?.accepted ?? false;
  const members = [...row.members].sort((a, b) => a.memberIndex - b.memberIndex);

  const values: RegistrationFormValues = {
    teamName: row.teamName,
    teamSize: row.teamSize,
    challengeCategories: [CATEGORY_FROM_DB[row.challengeCategory]],
    otherChallengeCategory: row.challengeCategoryOther ?? undefined,
    previousCompetitions: row.previousCompetitions ?? undefined,
    featuredProject: row.notableProject,
    expectations: row.expectations,
    companyExperience: EXPERIENCE_FROM_DB[row.companyExperience],
    members: members.map((m) => ({
      fullName: m.fullName,
      studentId: m.studentId,
      major: m.major,
      email: m.email,
      phone: m.phone,
      role: m.isCaptain ? 'leader' : 'member',
    })),
    commitments: {
      truthfulInformation: consentOf('INFORMATION_ACCURACY'),
      mediaConsent: consentOf('MEDIA_USE'),
      rulesAccepted: consentOf('RULES_ACCEPTANCE'),
      privacyAcknowledged: consentOf('INFORMATION_ACCURACY'),
    },
    publicConsent: {
      shareTeamProfile: consentOf('PUBLIC_TEAM_PROFILE'),
      shareMemberNames: consentOf('PUBLIC_MEMBER_NAMES'),
      shareLogoOrPhotos: consentOf('PUBLIC_MEMBER_PHOTOS'),
      shareProjectSummary: consentOf('PUBLIC_PROJECT_SUMMARY'),
    },
    honeypot: '',
    formStartedAt: row.createdAt.toISOString(),
  };

  return {
    id: row.id,
    registrationCode: row.registrationCode,
    submittedAt: row.submittedAt.toISOString(),
    status: row.status,
    data: values,
  };
};
