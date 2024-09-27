import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

import { createPlugins } from './vite.config';

export default defineConfig({
  build: {
    outDir: resolve(__dirname, 'ui'),
    lib: {
      entry: resolve(__dirname, './src/ui.ts'),
      name: 'voiceflow-chat-ui',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `components.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [react(), ...createPlugins()],
});
