export const env = {
  appEnv: (import.meta.env.VITE_APP_ENV as string) || 'preview',
  apiBaseUrl: (import.meta.env.VITE_PUBLIC_API_BASE_URL as string) || '/api',
  siteUrl: (import.meta.env.VITE_PUBLIC_SITE_URL as string) || '',
  analyticsEnabled: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
  isPreview: (import.meta.env.VITE_APP_ENV as string) !== 'production',
  isProduction: (import.meta.env.VITE_APP_ENV as string) === 'production',
} as const;
