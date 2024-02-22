import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  define: {
    __USE_SHADOW_ROOT__: true,
  },
  plugins: [react(), tsconfigPaths({ root: __dirname, projects: [path.join(__dirname, 'tsconfig.json')] })] as any[],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['config/test/setup.ts'],
    coverage: {
      include: ['src/**'],
      all: true,
    },
    include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
