import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * index.html carries a `__PICC_BASE_PATH__` token that docker-entrypoint.sh
 * fills in at container start. The dev server has no entrypoint, so substitute
 * it here; production builds keep the token for the container to replace.
 */
const basePathToken = (basePath: string, isBuild: boolean): Plugin => ({
  name: 'picc-base-path-token',
  transformIndexHtml: {
    order: 'pre',
    handler: (html) => (isBuild ? html : html.replaceAll('__PICC_BASE_PATH__', basePath)),
  },
});

const normalizeBasePath = (value?: string) => {
  if (!value || value === '/') return '/';
  return `/${value.replace(/^\/+|\/+$/g, '')}/`;
};

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const basePath = normalizeBasePath(env.VITE_BASE_PATH || process.env.VITE_BASE_PATH);

  return {
    /**
     * Production builds emit RELATIVE asset URLs and rely on the `<base href>`
     * that the container entrypoint injects into index.html at start-up. That
     * keeps the mount path a runtime setting: the same image can be proxied at
     * `/`, `/cuocthi/` or anything else without rebuilding.
     *
     * The dev server still uses the absolute path so the proxy rules below and
     * the router basename line up with what you type in the browser.
     */
    base: command === 'build' ? './' : basePath,
    plugins: [react(), basePathToken(basePath, command === 'build')],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      proxy: {
        '/cuocthi/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/cuocthi/, ''),
        },
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('@mui/material') || id.includes('@mui/icons-material')) {
              return 'mui';
            }
            if (id.includes('motion')) {
              return 'motion';
            }
          },
        },
      },
    },
  };
});
