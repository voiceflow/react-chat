/* eslint-disable sonarjs/prefer-single-boolean-return */
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import { createPlugins } from '../vite.config';

const config: StorybookConfig = {
  stories: ['../src/**/*.story.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: '@storybook/react-vite',
  core: {
    builder: '@storybook/builder-vite',
  },
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop: { name: string; parent?: { fileName: string } }): boolean => {
        if (['ref', 'css'].includes(prop.name)) return false;
        if (prop.parent && /node_modules/.test(prop.parent.fileName)) return false;

        return true;
      },
    },
  },

  viteFinal: (config) => {
    return mergeConfig(config, {
      plugins: [...createPlugins(__dirname), svgr()],
      define: {
        __USE_SHADOW_ROOT__: false,
      },
    });
  },
};

export default config;
