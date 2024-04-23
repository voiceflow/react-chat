import baseConfig from '@voiceflow/eslint-config';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  {
    ignores: ['**/storybook-static/**'],
  },
  {
    rules: {
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    },
  },
];
