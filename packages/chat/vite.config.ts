import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import type { PluginOption } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import fonts from 'vite-plugin-fonts';
import { createHtmlPlugin } from 'vite-plugin-html';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export const createPlugins = (): PluginOption[] => [
  vanillaExtractPlugin(),
  tsconfigPaths(),
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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      port: 3006,
      open: '/examples/index.html',
    },
    define: {
      __USE_SHADOW_ROOT__: true,
      __STYLES_URL__: JSON.stringify('http://localhost:3000/style.css'),
      'process.env': {},
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        name: 'voiceflow-chat',
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
