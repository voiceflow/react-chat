import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths';

export const createPlugins = (rootDir = __dirname): PluginOption[] => [
  tsconfigPaths({ root: rootDir, projects: [path.join(__dirname, 'tsconfig.json')] }),
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const VITE_WIDGET_URL = env.VITE_WIDGET_URL.replace('CIRCLE_SHA1', process.env.CIRCLE_SHA1 || 'latest');

  return {
    server: {
      port: 3005,
      open: '/examples/index.html',
    },
    define: {
      'process.env': {
        VITE_WIDGET_URL,
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'index.tsx'),
        name: 'voiceflow-chat-iframe',
        fileName: 'bundle',
        formats: ['iife'],
      },
      rollupOptions: {
        output: {
          extend: true,
          entryFileNames: 'bundle.mjs',
        },
      },
    },
    plugins: [
      react(),
      ...(mode === 'development'
        ? [
            createHtmlPlugin({
              template: 'examples/index.html',
              inject: { data: env },
            }),
          ]
        : []),
      ...createPlugins(),
    ],
  };
});
