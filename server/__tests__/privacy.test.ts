import { describe, it, expect } from 'vitest';
import { RegistrationService } from '../services/registrationService';
import { CompetitionStatusService } from '../services/competitionStatus';

describe('PICC 2026 Production Backend Security & Business Rules', () => {
  it('1. Should correctly compute competition status for PICC 2026', () => {
    const status = CompetitionStatusService.getStatus();
    expect(status).toHaveProperty('currentStatus');
    expect(status).toHaveProperty('serverTime');
    expect(status.timezone).toBe('Asia/Ho_Chi_Minh');
    expect(status.openAt).toBe('2026-08-01T00:00:00+07:00');
    expect(status.closeAt).toBe('2026-08-15T23:59:59+07:00');
  });

  it('2. Should reject registration with team size less than 3', async () => {
    const invalidPayload: any = {
      teamName: 'Test Team',
      teamSize: 2,
      members: [
        { role: 'leader', fullName: 'A', studentId: 'B201', major: 'IT', email: 'a@ptit.edu.vn', phone: '0912345678' },
        { role: 'member', fullName: 'B', studentId: 'B202', major: 'IT', email: 'b@ptit.edu.vn', phone: '0912345679' },
      ],
      commitments: { truthfulInformation: true, mediaConsent: true, rulesAccepted: true },
    };

    await expect(RegistrationService.processRegistration(invalidPayload, '127.0.0.1')).rejects.toMatchObject({
      code: 'INVALID_TEAM_SIZE',
    });
  });

  it('3. Should reject registration with duplicate student IDs in team', async () => {
    const duplicateStudentPayload: any = {
      teamName: 'Duplicate Team',
      teamSize: 3,
      members: [
        { role: 'leader', fullName: 'Leader', studentId: 'B20DCCN001', major: 'IT', email: 'l@ptit.edu.vn', phone: '0912345678' },
        { role: 'member', fullName: 'Member 1', studentId: 'B20DCCN001', major: 'IT', email: 'm1@ptit.edu.vn', phone: '0912345679' },
        { role: 'member', fullName: 'Member 2', studentId: 'B20DCCN003', major: 'IT', email: 'm2@ptit.edu.vn', phone: '0912345680' },
      ],
      commitments: { truthfulInformation: true, mediaConsent: true, rulesAccepted: true },
    };

    await expect(RegistrationService.processRegistration(duplicateStudentPayload, '127.0.0.1')).rejects.toMatchObject({
      code: 'DUPLICATE_STUDENT_ID',
    });
  });

  it('4. Should reject registration missing mandatory commitments', async () => {
    const missingConsentPayload: any = {
      teamName: 'No Consent Team',
      teamSize: 3,
      members: [
        { role: 'leader', fullName: 'Leader', studentId: 'B20DCCN001', major: 'IT', email: 'l@ptit.edu.vn', phone: '0912345678' },
        { role: 'member', fullName: 'Member 1', studentId: 'B20DCCN002', major: 'IT', email: 'm1@ptit.edu.vn', phone: '0912345679' },
        { role: 'member', fullName: 'Member 2', studentId: 'B20DCCN003', major: 'IT', email: 'm2@ptit.edu.vn', phone: '0912345680' },
      ],
      commitments: { truthfulInformation: true, mediaConsent: false, rulesAccepted: true },
    };

    await expect(RegistrationService.processRegistration(missingConsentPayload, '127.0.0.1')).rejects.toMatchObject({
      code: 'CONSENT_REQUIRED',
    });
  });
});
