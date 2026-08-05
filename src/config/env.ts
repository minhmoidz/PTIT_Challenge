import { appApiBasePath } from './paths';

export const env = {
  appEnv: (import.meta.env.VITE_APP_ENV as string) || 'preview',
  /**
   * Always derived from the runtime mount path, never baked in at build time.
   * The API is served from `<mount>/api` by the same nginx that serves the SPA,
   * so a third-party proxy moves both together without a rebuild.
   */
  apiBaseUrl: appApiBasePath,
  analyticsEnabled: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
  isPreview: (import.meta.env.VITE_APP_ENV as string) !== 'production',
  isProduction: (import.meta.env.VITE_APP_ENV as string) === 'production',
} as const;
