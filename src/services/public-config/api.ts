import { httpClient } from '@/services/http/client';
import type { PublicPiccConfig } from '@/types/registration';
import { setPublicConfig, getPublicConfig } from '@/config/public-config';

export const fetchPublicConfig = async (): Promise<PublicPiccConfig> => {
  try {
    const { data } = await httpClient.get<PublicPiccConfig>('/public-config');
    if (data && typeof data === 'object' && 'registration' in data && data.registration) {
      setPublicConfig(data);
      return data;
    }
  } catch {
    // Fallback to local config if server endpoint is offline
  }
  return getPublicConfig();
};
