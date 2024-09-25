import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { createPlugins } from './vite.config';

export default defineConfig({
  define: {
    __USE_SHADOW_ROOT__: false,
    __STYLES_URL__: JSON.stringify('https://cdn.voiceflow.com/widget/style.css'),
    'process.env': {},
  },
  build: {
    outDir: path.resolve(__dirname, 'build'),
    lib: {
      entry: path.resolve(__dirname, 'src', 'package.entry.ts'),
      name: 'voiceflow-chat',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
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
  plugins: [react(), dts(), ...createPlugins()],
});
