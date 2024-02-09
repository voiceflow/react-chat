import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, PluginOption } from 'vite';
import fonts from 'vite-plugin-fonts';
import { createHtmlPlugin } from 'vite-plugin-html';
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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      port: 3006,
      open: '/examples/index.html',
    },
    define: {
      __USE_SHADOW_ROOT__: true,
      'process.env': '({})',
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        name: 'voiceflow-react-chat',
        fileName: 'bundle',
        formats: ['iife'],
      },
      rollupOptions: {
        output: {
          extend: true,
          entryFileNames: 'bundle.mjs',
          manualChunks(id) {
            console.log('id >>>', id);

            // Specify the chunk name for dynamic imports
            if (id.includes('dynamicImports')) {
              return 'dynamicImports';
            }
            // Bundle third-party dependencies separately
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            return null; // Let Rollup handle other imports normally
          },
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
