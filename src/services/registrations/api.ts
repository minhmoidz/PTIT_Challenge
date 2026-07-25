import { httpClient } from '@/services/http/client';
import type { ApiSuccess, ApiError, RegistrationFormValues } from '@/types/registration';

export type SubmitRegistrationPayload = RegistrationFormValues;

export const submitRegistration = async (
  payload: SubmitRegistrationPayload,
  idempotencyKey: string,
): Promise<ApiSuccess> => {
  const { data } = await httpClient.post<ApiSuccess | ApiError>(
    '/v1/public/registrations',
    payload,
    { headers: { 'Idempotency-Key': idempotencyKey } },
  );
  if (!data.success) throw data;
  return data;
};
