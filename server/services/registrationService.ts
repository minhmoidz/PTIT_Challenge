import { dbStore } from '../db/store';
import { CompetitionStatusService } from './competitionStatus';
import { sendRegistrationConfirmation } from './emailService';
import type { RegistrationFormValues } from '../../src/types/registration';
import { competitionData } from '../../src/data/competition';

export interface RegistrationSubmissionResult {
  success: true;
  data: {
    registrationCode: string;
    submissionId: string;
    submittedAt: string;
  };
}

export class RegistrationService {
  public static async processRegistration(
    payload: RegistrationFormValues,
    _clientIp: string,
  ): Promise<RegistrationSubmissionResult> {
    const statusInfo = CompetitionStatusService.getStatus();

    // 1. Business Rule: Check registration window
    if (!statusInfo.registrationAvailable && process.env.NODE_ENV === 'production') {
      throw {
        status: 409,
        code: 'REGISTRATION_CLOSED',
        message: 'Cổng đăng ký hiện không nhận hồ sơ (Thời gian đăng ký 01/08 - 15/08/2026).',
      };
    }

    // 2. Business Rule: Team size range from competition rules (3–4)
    if (
      payload.teamSize < competitionData.teamRules.min ||
      payload.teamSize > competitionData.teamRules.max
    ) {
      throw {
        status: 400,
        code: 'INVALID_TEAM_SIZE',
        message: `Quy mô đội thi phải từ ${competitionData.teamRules.min.toString().padStart(2, '0')} đến ${competitionData.teamRules.max.toString().padStart(2, '0')} thành viên.`,
      };
    }

    // 3. Business Rule: Member count match
    if (!Array.isArray(payload.members) || payload.members.length !== payload.teamSize) {
      throw {
        status: 400,
        code: 'VALIDATION_ERROR',
        message: 'Số lượng thành viên khai báo không khớp với quy mô đội.',
      };
    }

    // 4. Business Rule: Exactly 1 Leader
    const leaders = payload.members.filter((m) => m.role === 'leader');
    if (leaders.length !== 1) {
      throw {
        status: 400,
        code: 'VALIDATION_ERROR',
        message: 'Đội thi phải có đúng 01 đội trưởng.',
      };
    }

    // 5. Business Rule: Unique student IDs in team
    const studentIds = payload.members.map((m) => m.studentId.trim().toUpperCase());
    const uniqueStudentIds = new Set(studentIds);
    if (uniqueStudentIds.size !== studentIds.length) {
      throw {
        status: 400,
        code: 'DUPLICATE_STUDENT_ID',
        message: 'Mã sinh viên trong cùng một đội thi không được trùng lặp.',
      };
    }

    // 6. Business Rule: Unique emails in team
    const memberEmails = payload.members.map((m) => m.email.trim().toLowerCase());
    const uniqueEmails = new Set(memberEmails);
    if (uniqueEmails.size !== memberEmails.length) {
      throw {
        status: 400,
        code: 'DUPLICATE_MEMBER_EMAIL',
        message: 'Email giữa các thành viên trong đội không được trùng lặp.',
      };
    }

    // 7. Business Rule: Check duplicates across database
    const duplicateErr = await dbStore.checkDuplicateStudentOrEmail(studentIds, memberEmails);
    if (duplicateErr) {
      throw {
        status: 409,
        code: 'DUPLICATE_REGISTRATION',
        message: duplicateErr,
      };
    }

    // 8. Business Rule: 4 Mandatory Commitments (incl. privacy acknowledgement)
    if (
      !payload.commitments?.truthfulInformation ||
      !payload.commitments?.mediaConsent ||
      !payload.commitments?.rulesAccepted ||
      !payload.commitments?.privacyAcknowledged
    ) {
      throw {
        status: 400,
        code: 'CONSENT_REQUIRED',
        message: 'Vui lòng đánh dấu hoàn thành cả 04 cam kết bắt buộc.',
      };
    }

    // 9. Process Submission & Save Transactionally
    const result = await dbStore.saveRegistration(payload);

    // Fire-and-forget confirmation email. Never blocks or fails the submission.
    const leader = payload.members.find((m) => m.role === 'leader') ?? payload.members[0];
    void sendRegistrationConfirmation({
      to: leader.email,
      teamName: payload.teamName,
      leaderName: leader.fullName,
      registrationCode: result.registrationCode,
      submittedAt: result.submittedAt,
    }).catch(() => undefined);

    return {
      success: true,
      data: {
        registrationCode: result.registrationCode,
        submissionId: result.submissionId,
        submittedAt: result.submittedAt,
      },
    };
  }
}
