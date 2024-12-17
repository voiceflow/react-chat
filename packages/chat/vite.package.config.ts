import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import { createPlugins } from './vite.widget.config';

export default defineConfig({
  define: {
    __USE_SHADOW_ROOT__: false,
    __STYLES_URL__: JSON.stringify('https://cdn.voiceflow.com/widget-next/style.css'),
    'process.env': {},
  },
  build: {
    outDir: path.resolve(__dirname, 'build'),
    lib: {
      entry: {
        main: path.resolve(__dirname, './src/main.ts'),
        stories: path.resolve(__dirname, './src/stories.ts'),
      },
      name: 'voiceflow-chat',
      fileName: (format, entry) => `${entry}.${format}.js`,
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
  plugins: [
    react(),
    dts({ tsconfigPath: 'tsconfig.build.json' }),
    ...createPlugins(),
    viteStaticCopy({
      targets: [
        { src: 'src/assets/vf_chat.png', dest: '' },
        { src: 'src/assets/message.png', dest: '' },
      ],
    }),
  ],
});
