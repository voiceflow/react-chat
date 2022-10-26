import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths({ root: __dirname, projects: [path.join(__dirname, 'tsconfig.json')] })] as any[],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['config/test/setup.ts'],
    coverage: {
      include: ['src/**'],
      all: true,
    },
  },
});
