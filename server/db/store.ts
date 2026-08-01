import type { PublicationStatus, PublicTeamProfile as DbPublicTeam, Prisma, RegistrationStatus, TeamCompetitionStatus } from '@prisma/client';
import type { PublicTeamProfile } from '../../src/types/publicTeam';
import { CATEGORY_LABEL_MAP, TEAM_STATUS_MAP } from '../../src/types/publicTeam';
import type { RegistrationFormValues } from '../../src/types/registration';
import { prisma } from './prisma';
import { buildConsentRows, toDbCategory, toDbExperience, toRegistrationRecord } from './mappers';

export interface DBRegistrationRecord {
  id: string;
  registrationCode: string;
  submittedAt: string;
  data: RegistrationFormValues;
  status: RegistrationStatus;
}

const COMPETITION_SLUG = 'picc-2026';

const REGISTRATION_INCLUDE = { members: true, consents: true } as const;

const PUBLIC_TEAM_INCLUDE = {
  publicMembers: { where: { isPublished: true }, orderBy: { sortOrder: 'asc' } },
  publicProject: true,
} as const;

type PublicTeamRow = Prisma.PublicTeamProfileGetPayload<{ include: typeof PUBLIC_TEAM_INCLUDE }>;

const PUBLICATION_FROM_DB: Record<PublicationStatus, PublicTeamProfile['publication']['status']> = {
  DRAFT: 'draft',
  PENDING_REVIEW: 'pending_review',
  APPROVED: 'approved',
  PUBLISHED: 'published',
  HIDDEN: 'hidden',
  REJECTED: 'rejected',
};

const TEAM_STATUS_FROM_DB: Record<TeamCompetitionStatus, PublicTeamProfile['competitionStatus']> = {
  VERIFIED: 'verified',
  ROUND_ONE: 'round_one',
  SEMIFINALIST: 'semifinalist',
  PILOT: 'pilot',
  FINALIST: 'finalist',
  WINNER: 'winner',
  COMPLETED: 'completed',
};

const CATEGORY_FROM_DB: Record<DbPublicTeam['challengeCategory'], PublicTeamProfile['challengeCategory']> = {
  BUSINESS: 'business',
  TECHNOLOGY: 'technology',
  MARKETING: 'marketing',
  COMMUNICATIONS: 'communications',
  OTHER: 'other',
};

const toPublicTeam = (row: PublicTeamRow): PublicTeamProfile => {
  const category = CATEGORY_FROM_DB[row.challengeCategory];
  const status = TEAM_STATUS_FROM_DB[row.competitionStatus];

  return {
    id: row.id,
    slug: row.slug,
    teamName: row.teamName,
    teamSize: row.teamSize as PublicTeamProfile['teamSize'],
    challengeCategory: category,
    challengeCategoryLabel: CATEGORY_LABEL_MAP[category],
    slogan: row.slogan ?? undefined,
    shortDescription: row.shortDescription ?? undefined,
    competitionStatus: status,
    statusLabel: row.statusLabel ?? TEAM_STATUS_MAP[status].label,
    publicMembers: row.showMemberNames
      ? row.publicMembers.map((m) => ({
          displayName: m.displayName,
          role: m.role ?? undefined,
          major: m.major ?? undefined,
        }))
      : [],
    project:
      row.showProjectSummary && row.publicProject
        ? {
            title: row.publicProject.title ?? undefined,
            summary: row.publicProject.summary ?? undefined,
            problem: row.publicProject.problem ?? undefined,
            solution: row.publicProject.solution ?? undefined,
            tags: row.publicProject.tags,
          }
        : undefined,
    publication: {
      status: PUBLICATION_FROM_DB[row.publicationStatus],
      showTeamProfile: row.showTeamProfile,
      showMemberNames: row.showMemberNames,
      showMemberPhotos: row.showMemberPhotos,
      showProjectSummary: row.showProjectSummary,
      approvedAt: row.approvedAt?.toISOString(),
      publishedAt: row.publishedAt?.toISOString(),
    },
    updatedAt: row.updatedAt.toISOString(),
  };
};

class DBStore {
  private competitionId: string | null = null;

  /**
   * Registrations are foreign-keyed to a competition, so one row has to exist
   * before the form can accept anything. Created once, then cached.
   */
  public async ensureCompetition(): Promise<string> {
    if (this.competitionId) return this.competitionId;

    const existing = await prisma.competition.findUnique({ where: { slug: COMPETITION_SLUG } });
    if (existing) {
      this.competitionId = existing.id;
      return existing.id;
    }

    const created = await prisma.competition.create({
      data: {
        slug: COMPETITION_SLUG,
        name: 'PTIT Innovation Catalyst Challenge 2026',
        shortName: 'PICC 2026',
        theme: 'Rise Beyond Limits',
        description:
          'Sân chơi giải Case Study cấp Học viện do Trung tâm Đổi mới Sáng tạo và Khởi nghiệp PTIT (IEC) tổ chức.',
        shortDescription: 'Case Study Challenge cấp Học viện dành cho sinh viên PTIT.',
      },
    });
    this.competitionId = created.id;
    return created.id;
  }

  public async saveRegistration(
    values: RegistrationFormValues,
    ipHash?: string,
  ): Promise<{ registrationCode: string; submissionId: string; submittedAt: string }> {
    const competitionId = await this.ensureCompetition();
    const captain = values.members.find((m) => m.role === 'leader') ?? values.members[0];

    const created = await prisma.registration.create({
      data: {
        competitionId,
        registrationCode: await this.nextRegistrationCode(),
        teamName: values.teamName.trim(),
        teamSize: values.teamSize,
        captainEmail: captain.email.trim().toLowerCase(),
        captainPhone: captain.phone.trim(),
        challengeCategory: toDbCategory(values.challengeCategories?.[0]),
        challengeCategoryOther: values.otherChallengeCategory?.trim() || null,
        previousCompetitions: values.previousCompetitions?.trim() || null,
        notableProject: values.featuredProject,
        expectations: values.expectations,
        companyExperience: toDbExperience(values.companyExperience),
        members: {
          create: values.members.map((m, index) => ({
            memberIndex: index,
            isCaptain: m.role === 'leader',
            fullName: m.fullName.trim(),
            studentId: m.studentId.trim().toUpperCase(),
            major: m.major?.trim() || 'PTIT',
            email: m.email.trim().toLowerCase(),
            phone: m.phone.trim(),
          })),
        },
        consents: {
          create: buildConsentRows(values).map((c) => ({ ...c, ipHash: ipHash ?? null })),
        },
      },
    });

    await this.addAuditLog('CREATE_REGISTRATION', 'Registration', created.id, { ipHash });

    return {
      registrationCode: created.registrationCode,
      submissionId: created.id,
      submittedAt: created.submittedAt.toISOString(),
    };
  }

  /** Retries on the unique constraint rather than trusting a bare random draw. */
  private async nextRegistrationCode(): Promise<string> {
    for (let attempt = 0; attempt < 8; attempt++) {
      const code = `PICC26-${Math.floor(100000 + Math.random() * 900000)}`;
      const clash = await prisma.registration.findUnique({ where: { registrationCode: code } });
      if (!clash) return code;
    }
    return `PICC26-${Date.now().toString().slice(-6)}`;
  }

  public async getRegistrations(): Promise<DBRegistrationRecord[]> {
    const rows = await prisma.registration.findMany({
      include: REGISTRATION_INCLUDE,
      orderBy: { submittedAt: 'desc' },
    });
    return rows.map(toRegistrationRecord);
  }

  public async getRegistrationById(id: string): Promise<DBRegistrationRecord | null> {
    const row = await prisma.registration.findUnique({ where: { id }, include: REGISTRATION_INCLUDE });
    return row ? toRegistrationRecord(row) : null;
  }

  public async updateRegistrationStatus(
    id: string,
    status: RegistrationStatus,
    reviewedBy: string,
    rejectionReason?: string,
  ): Promise<DBRegistrationRecord | null> {
    const before = await prisma.registration.findUnique({ where: { id } });
    if (!before) return null;

    const row = await prisma.registration.update({
      where: { id },
      data: {
        status,
        reviewedAt: new Date(),
        reviewedBy,
        rejectionReason: status === 'REJECTED' ? rejectionReason?.trim() || null : null,
        version: { increment: 1 },
      },
      include: REGISTRATION_INCLUDE,
    });

    await this.addAuditLog('UPDATE_REGISTRATION_STATUS', 'Registration', id, {
      actorUserId: reviewedBy,
      beforeData: { status: before.status },
      afterData: { status, rejectionReason: row.rejectionReason },
    });

    return toRegistrationRecord(row);
  }

  public async checkDuplicateStudentOrEmail(studentIds: string[], emails: string[]): Promise<string | null> {
    const clash = await prisma.teamMember.findFirst({
      where: {
        registration: { status: { not: 'WITHDRAWN' } },
        OR: [{ studentId: { in: studentIds } }, { email: { in: emails } }],
      },
    });
    if (!clash) return null;

    return studentIds.includes(clash.studentId)
      ? `Mã sinh viên ${clash.studentId} đã đăng ký trong đội khác.`
      : `Email ${clash.email} đã đăng ký trong đội khác.`;
  }

  public async getPublicTeams(category?: string, status?: string, search?: string): Promise<PublicTeamProfile[]> {
    const rows = await prisma.publicTeamProfile.findMany({
      where: {
        publicationStatus: 'PUBLISHED',
        showTeamProfile: true,
        ...(category && category !== 'all' ? { challengeCategory: toDbCategory(category) } : {}),
        ...(status && status !== 'all'
          ? { competitionStatus: status.toUpperCase() as TeamCompetitionStatus }
          : {}),
        ...(search?.trim()
          ? {
              OR: [
                { teamName: { contains: search.trim(), mode: 'insensitive' } },
                { slogan: { contains: search.trim(), mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      include: PUBLIC_TEAM_INCLUDE,
      orderBy: { updatedAt: 'desc' },
    });
    return rows.map(toPublicTeam);
  }

  /** Every profile regardless of publication state — for the admin review queue. */
  public async getAllTeamProfiles(): Promise<PublicTeamProfile[]> {
    const rows = await prisma.publicTeamProfile.findMany({
      include: PUBLIC_TEAM_INCLUDE,
      orderBy: { updatedAt: 'desc' },
    });
    return rows.map(toPublicTeam);
  }

  public async getPublicTeamBySlug(slug: string): Promise<PublicTeamProfile | null> {
    const row = await prisma.publicTeamProfile.findFirst({
      where: { slug, publicationStatus: 'PUBLISHED', showTeamProfile: true },
      include: PUBLIC_TEAM_INCLUDE,
    });
    return row ? toPublicTeam(row) : null;
  }

  public async countPublishedTeams(): Promise<number> {
    return prisma.publicTeamProfile.count({ where: { publicationStatus: 'PUBLISHED' } });
  }

  public async countTeamProfiles(): Promise<number> {
    return prisma.publicTeamProfile.count();
  }

  public async addAuditLog(
    action: string,
    entityType: string,
    entityId: string,
    extra?: {
      actorUserId?: string;
      beforeData?: Prisma.InputJsonValue;
      afterData?: Prisma.InputJsonValue;
      ipHash?: string;
    },
  ): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          action,
          entityType,
          entityId,
          actorUserId: extra?.actorUserId ?? null,
          beforeData: extra?.beforeData,
          afterData: extra?.afterData,
          ipHash: extra?.ipHash ?? null,
        },
      });
    } catch (err) {
      // An audit write must never take down the request that triggered it.
      console.error('[DBStore] Failed to write audit log:', err);
    }
  }
}

export const dbStore = new DBStore();
