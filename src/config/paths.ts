const normalizeBasePath = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') return '/';

  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`;
};

export const appBasePath = normalizeBasePath(import.meta.env.BASE_URL || '/');

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
