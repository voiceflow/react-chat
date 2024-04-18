import baseConfig from '@voiceflow/eslint-config';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  {
    ignores: ['**/dist/**', '**/storybook-static/**'],
  },
];
