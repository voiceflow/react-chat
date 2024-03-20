import { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

import { createPlugins } from '../vite.config';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../src/**/*.story.mdx', '../src/**/*.story.@(js|jsx|ts|tsx)', '../iframe/**/*.story.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', 'storybook-dark-mode'],
  framework: '@storybook/react-vite',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
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

  viteFinal: (config) =>
    mergeConfig(config, {
      base: '/react-chat/',
      plugins: [...createPlugins(__dirname), svgr()],
      define: {
        __USE_SHADOW_ROOT__: false,
      },
    }),
};

export default config;
