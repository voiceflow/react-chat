import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'voiceflow-chat-iframe',
      fileName: 'bundle',
      formats: ['es'],
    },
  },
  plugins: [],
});
