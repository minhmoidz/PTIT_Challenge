const normalizeBasePath = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed || trimmed === '/' || trimmed === './') return '/';

  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`;
};

declare global {
  interface Window {
    __PICC_BASE__?: string;
  }
}

/**
 * Where the app is mounted on the public origin.
 *
 * Resolved at runtime from the value docker-entrypoint.sh injects into
 * index.html, so one build can sit behind a third-party reverse proxy at any
 * prefix without being rebuilt. `import.meta.env.BASE_URL` is the dev-server
 * fallback; production builds set it to "./", which normalizes to "/".
 *
 * If the token was never substituted (a built image served without the
 * entrypoint), fall back to "/" rather than emitting a literal placeholder.
 */
const resolveBasePath = (): string => {
  const injected = typeof window !== 'undefined' ? window.__PICC_BASE__ : undefined;

  if (injected && !injected.includes('__PICC_BASE_PATH__')) {
    return normalizeBasePath(injected);
  }

  return normalizeBasePath(import.meta.env.BASE_URL || '/');
};

export const appBasePath = resolveBasePath();

export const appPath = (path = '/') => {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return normalizedPath ? `${appBasePath}${normalizedPath}` : appBasePath;
};

export const appHash = (hash: string) => appPath(`/#${hash.replace(/^#/, '')}`);

export const assetPath = (path: string) => appPath(path);

export const appApiBasePath = appPath('api').replace(/\/$/, '');

export const externalLinks = {
  iec: 'https://iec.ptit.edu.vn/',
  ptit: 'https://ptit.edu.vn/',
} as const;
