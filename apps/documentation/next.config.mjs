import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const withVanillaExtract = createVanillaExtractPlugin({ ssr: true, identifiers: ({ hash }) => `vfui_${hash}` });

const plugins = [withVanillaExtract];

const phaseConfig = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return defaultConfig;
  }

  return {
    typescript: {
      tsconfigPath: 'tsconfig.build.json',
    },
  };
};

const pluginConfig = plugins.reduce((acc, plugin) => plugin(acc), phaseConfig);

/** @type {import('next').NextConfig} */

const nextConfig = {
  ...pluginConfig,
  distDir: 'build',
  webpack: (webpackConfig, context) => {
    const baseConfig = pluginConfig.webpack(webpackConfig, context);

    return {
      ...baseConfig,

      resolve: {
        ...baseConfig?.resolve,

        alias: {
          ...baseConfig?.resolve?.alias,

          '@voiceflow/ui': '@voiceflow/ui',
          '@voiceflow/ui/styles': '@voiceflow/ui/styles',
          '@voiceflow/ui/utils': '@voiceflow/ui/utils',
          '@voiceflow/ui/theme.css': '@voiceflow/ui/theme.css',
          '@voiceflow/ui/global.css': '@voiceflow/ui/global.css',
        },
      },

      optimization: {
        ...baseConfig.optimization,
        minimize: false,
      },
    };
  },
};

export default nextConfig;
