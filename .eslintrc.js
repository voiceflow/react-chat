module.exports = {
  extends: ['@voiceflow/eslint-config', '@voiceflow/eslint-config/typescript', '@voiceflow/eslint-config/frontend'],
  rules: {
    // off
    '@typescript-eslint/no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: ['test/**/*', 'config/**/*', '.storybook/**/*', '**/*.story.tsx', '**/*.test.*', '**/*.mdx', '*.config.ts'],
      extends: ['@voiceflow/eslint-config/utility'],
      rules: {
        // off
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['**/*.story.tsx'],
      extends: ['plugin:storybook/recommended'],
    },
    {
      files: ['**/*.mdx'],
      extends: ['plugin:mdx/recommended'],
      rules: {
        // off
        'no-unused-vars': 'off',
        'import/no-named-as-default-member': 'off',
        'react/jsx-no-undef': 'off',
      },
    },
  ],
};
