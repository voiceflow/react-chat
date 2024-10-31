import baseConfig from '@voiceflow/eslint-config';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  {
    ignores: ['**/storybook-static/**', '**/public/bundle/*', '**/.next/**'],
  },

  {
    rules: {
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    },
  },
];
