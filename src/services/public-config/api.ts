import { httpClient } from '@/services/http/client';
import type { PublicPiccConfig } from '@/types/registration';
import { setPublicConfig } from '@/config/public-config';

export const fetchPublicConfig = async (): Promise<PublicPiccConfig> => {
  const { data } = await httpClient.get<PublicPiccConfig>('/public-config');
  if (data && typeof data === 'object' && 'registration' in data && data.registration) {
    setPublicConfig(data);
    return data;
  }
  throw new Error('Invalid public config payload');
};
