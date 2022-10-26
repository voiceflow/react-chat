const path = require('path');

module.exports = {
  extends: ['@voiceflow/eslint-config', '@voiceflow/eslint-config/frontend', '@voiceflow/eslint-config/typescript'],
  rules: {
    // off
    '@typescript-eslint/no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: path.resolve(__dirname, 'tsconfig.json'),
      },
    },
  },
  overrides: [
    {
      files: ['test/**/*', 'config/**/*', '**/*.test.*', '*.config.ts'],
      extends: ['@voiceflow/eslint-config/utility'],
      rules: {
        // off
        'no-unused-expressions': 'off',
      },
    },
  ],
};
