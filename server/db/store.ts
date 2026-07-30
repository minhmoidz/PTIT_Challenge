import type { PublicTeamProfile } from '../../src/types/publicTeam';
import type { RegistrationFormValues } from '../../src/types/registration';
import { loadRegistrations, saveRegistrations, loadAuditLogs, saveAuditLogs, type DBAuditLogRecord } from './persistence';

export interface DBRegistrationRecord {
  id: string;
  registrationCode: string;
  submittedAt: string;
  data: RegistrationFormValues;
  status: 'SUBMITTED' | 'VERIFIED' | 'REJECTED';
}

class DBStore {
  private registrations: Map<string, DBRegistrationRecord> = new Map();
  private publicTeams: Map<string, PublicTeamProfile> = new Map();
  private auditLogs: DBAuditLogRecord[] = [];

  constructor() {
    this.seedInitialPublicTeams();
    this.restoreFromBackup();
  }

  private restoreFromBackup() {
    try {
      const saved = loadRegistrations();
      for (const rec of saved) {
        this.registrations.set(rec.id, rec);
      }
      if (saved.length > 0) {
        console.log(`[DBStore] Restored ${saved.length} registrations from backup file.`);
      }
    } catch (err) {
      console.warn('[DBStore] No backup file found, starting fresh.');
    }

    this.auditLogs = loadAuditLogs();
  }

  private persistToBackup() {
    saveRegistrations(Array.from(this.registrations.values()));
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
    this.persistToBackup();

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
    saveAuditLogs(this.auditLogs);
  }
}

export const dbStore = new DBStore();
