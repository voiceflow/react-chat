import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { createPlugins } from './vite.config';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'build'),
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'voiceflow-chat',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
  },
  plugins: [react(), dts(), ...createPlugins()],
});
