import { useQuery } from '@tanstack/react-query';
import { fetchPublicConfig } from '@/services/public-config/api';
import { computeRegistrationStatus, getPublicConfig } from '@/config/public-config';
import type { RegistrationStatus, PublicPiccConfig } from '@/types/registration';

interface UseRegistrationStatusResult {
  status: RegistrationStatus;
  config: ReturnType<typeof getPublicConfig>;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useRegistrationStatus = (): UseRegistrationStatusResult => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['public-config'],
    queryFn: fetchPublicConfig,
    staleTime: 30_000,
    retry: 1,
  });

  const validData =
    data && typeof data === 'object' && 'registration' in data && data.registration
      ? (data as PublicPiccConfig)
      : null;

  const config = validData ?? getPublicConfig();
  const status = computeRegistrationStatus(config);

  return { status, config, isLoading, error, refetch };
};
