import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

import { createPlugins } from '../vite.config';

export default defineConfig({
  server: {
    port: 3001,
    open: '/examples/index.html',
  },
  resolve: {
    preserveSymlinks: true,
  },
  define: {
    'process.env': {},
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.tsx'),
      name: 'voiceflow-chat-iframe',
      fileName: 'bundle',
      formats: ['es'],
    },
  },
  plugins: [react(), ...createPlugins()],
});
