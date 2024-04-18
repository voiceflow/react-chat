import baseConfig from '@voiceflow/eslint-config';
import jsdoc from 'eslint-plugin-jsdoc';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  {
    ignores: ['**/storybook-static/**'],
  },
  {
    plugins: { jsdoc },
    rules: {
      'jsdoc/no-undefined-types': 'error',
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],

    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
    },
  },
];
