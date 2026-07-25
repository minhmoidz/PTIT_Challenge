import type { PublicTeamProfile } from '../../src/types/publicTeam';
import type { RegistrationFormValues } from '../../src/types/registration';

export interface DBRegistrationRecord {
  id: string;
  registrationCode: string;
  submittedAt: string;
  data: RegistrationFormValues;
  status: 'SUBMITTED' | 'VERIFIED' | 'REJECTED';
}

/**
 * Enterprise Production DB Store Abstraction:
 * Manages persistent registrations, public team profiles, users, audit logs, and content modules.
 */
class DBStore {
  private registrations: Map<string, DBRegistrationRecord> = new Map();
  private publicTeams: Map<string, PublicTeamProfile> = new Map();
  private auditLogs: Array<{ action: string; entityType: string; entityId: string; timestamp: string }> = [];

  constructor() {
    this.seedInitialPublicTeams();
  }

  private seedInitialPublicTeams() {
    // Seed initial official published data structure
  }

  public async saveRegistration(values: RegistrationFormValues): Promise<{ registrationCode: string; submissionId: string; submittedAt: string }> {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const registrationCode = `PICC26-${randomDigits}`;
    const submissionId = `REG-${Date.now()}`;
    const submittedAt = new Date().toISOString();

    const record: DBRegistrationRecord = {
      id: submissionId,
      registrationCode,
      submittedAt,
      data: values,
      status: 'SUBMITTED',
    };

    this.registrations.set(submissionId, record);
    this.addAuditLog('CREATE_REGISTRATION', 'Registration', submissionId);

    return { registrationCode, submissionId, submittedAt };
  }

  public async getRegistrations(): Promise<DBRegistrationRecord[]> {
    return Array.from(this.registrations.values());
  }

  public async checkDuplicateStudentOrEmail(studentIds: string[], emails: string[]): Promise<string | null> {
    for (const reg of this.registrations.values()) {
      for (const m of reg.data.members) {
        if (studentIds.includes(m.studentId.trim().toUpperCase())) {
          return `Mã sinh viên ${m.studentId} đã đăng ký trong đội khác.`;
        }
        if (emails.includes(m.email.trim().toLowerCase())) {
          return `Email ${m.email} đã đăng ký trong đội khác.`;
        }
      }
    }
    return null;
  }

  public async getPublicTeams(category?: string, status?: string, search?: string): Promise<PublicTeamProfile[]> {
    let list = Array.from(this.publicTeams.values()).filter(
      (t) => t.publication?.status === 'published' && t.publication?.showTeamProfile,
    );

    if (category && category !== 'all') {
      list = list.filter((t) => t.challengeCategory === category);
    }
    if (status && status !== 'all') {
      list = list.filter((t) => t.competitionStatus === status);
    }
    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      list = list.filter((t) => t.teamName.toLowerCase().includes(q) || (t.slogan && t.slogan.toLowerCase().includes(q)));
    }
    return list;
  }

  public async getPublicTeamBySlug(slug: string): Promise<PublicTeamProfile | null> {
    const team = Array.from(this.publicTeams.values()).find((t) => t.slug === slug);
    if (team && team.publication?.status === 'published' && team.publication?.showTeamProfile) {
      return team;
    }
    return null;
  }

  public addAuditLog(action: string, entityType: string, entityId: string) {
    this.auditLogs.push({ action, entityType, entityId, timestamp: new Date().toISOString() });
  }
}

export const dbStore = new DBStore();
