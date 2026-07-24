import { httpClient } from '@/services/http/client';
import type { ApiSuccess, ApiError } from '@/types/registration';

export interface SubmitRegistrationPayload {
  teamName: string;
  teamSize: number;
  challengeCategories: string[];
  otherChallengeCategory?: string;
  previousCompetitions?: string;
  featuredProject: string;
  expectations: string;
  companyExperience: string;
  members: {
    role: string;
    fullName: string;
    studentId: string;
    major: string;
    email: string;
    phone: string;
  }[];
  commitments: {
    truthfulInformation: boolean;
    mediaConsent: boolean;
    rulesAccepted: boolean;
    privacyAcknowledged: boolean;
  };
  honeypot: string;
  formStartedAt: string;
}

export const submitRegistration = async (
  payload: SubmitRegistrationPayload,
  idempotencyKey: string,
): Promise<ApiSuccess> => {
  const { data } = await httpClient.post<ApiSuccess | ApiError>(
    '/registrations',
    payload,
    { headers: { 'Idempotency-Key': idempotencyKey } },
  );
  if (!data.success) throw data;
  return data;
};
