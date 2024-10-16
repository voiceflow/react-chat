import baseConfig from '@voiceflow/eslint-config';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    ignores: ['**/storybook-static/**', '**/.next/**'],
  },
  {
    rules: {
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      'sonarjs/no-redeclare': 'off',
      'sonarjs/no-array-index-key': 'off',
      'sonarjs/hook-use-state': 'off',
      'sonarjs/no-nested-functions': 'off',
    },
  },
  {
    files: ['**/*.story.tsx'],
    rules: {
      'sonarjs/rules-of-hooks': 'off',
    },
  },
  {
    files: ['**/examples/**'],
    rules: {
      'sonarjs/pseudo-random': 'off',
    },
  },
];
