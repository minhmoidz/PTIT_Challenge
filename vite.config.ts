import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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
});
