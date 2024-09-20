import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'build',
  },
  define: {
    'import.meta.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  envPrefix: 'VF_',
  server: {
    port: 3006,
  },
});
