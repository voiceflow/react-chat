module.exports = {
  extends: ['@voiceflow/eslint-config', '@voiceflow/eslint-config/typescript'],
  overrides: [
    {
      files: ['test/**/*'],
      extends: ['@voiceflow/eslint-config/utility', '@voiceflow/eslint-config/mocha'],
      rules: {
        // off
        'no-unused-expressions': 'off',
      },
    },
  ],
};
