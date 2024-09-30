import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { createPlugins } from './vite.widget.config';

export default defineConfig({
  define: {
    __USE_SHADOW_ROOT__: false,
    'process.env': {},
  },
  build: {
    outDir: path.resolve(__dirname, 'build'),
    lib: {
      entry: path.resolve(__dirname, './src/main.ts'),
      name: 'voiceflow-chat',
      fileName: (format) => `main.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
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
  plugins: [react(), dts({ tsconfigPath: 'tsconfig.build.json' }), ...createPlugins()],
});
