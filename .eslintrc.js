module.exports = {
  extends: ['@voiceflow/eslint-config', '@voiceflow/eslint-config/typescript'],
  overrides: [
    {
      files: ['test/**/*', '*.config.ts'],
      extends: ['@voiceflow/eslint-config/utility'],
      rules: {
        // off
        'no-unused-expressions': 'off',
      },
    },
  ],
};
