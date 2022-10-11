import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, PluginOption } from 'vite';
import fonts from 'vite-plugin-fonts';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export const createPlugins = (rootDir = __dirname): PluginOption[] => [
  tsconfigPaths({ root: rootDir, projects: [path.join(__dirname, 'tsconfig.json')] }),
  svgr(),
  fonts({
    google: {
      families: [
        {
          name: 'Open Sans',
          styles: 'wght@400;600',
          defer: true,
        },
      ],
    },
  }),
];

export default defineConfig({
  server: {
    port: 3002,
    open: false,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.html'),
      name: 'voiceflow-chat',
      fileName: 'bundle',
      formats: ['es'],
    },
  },
  plugins: [react(), ...createPlugins()],
});
