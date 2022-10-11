import path from 'path';
import { defineConfig } from 'vite';

import { createPlugins } from '../vite.config';

export default defineConfig({
  server: {
    port: 3001,
    open: true,
  },
  resolve: {
    preserveSymlinks: true,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.tsx'),
      name: 'voiceflow-chat-iframe',
      fileName: 'bundle',
      formats: ['es'],
    },
  },
  plugins: createPlugins(),
});
