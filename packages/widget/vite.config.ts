import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, PluginOption } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export const createPlugins = (rootDir = __dirname): PluginOption[] => [
  tsconfigPaths({ root: rootDir, projects: [path.join(__dirname, 'tsconfig.json')] }),
];

export default defineConfig({
  server: {
    port: 3005,
    open: '/examples/index.html',
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
