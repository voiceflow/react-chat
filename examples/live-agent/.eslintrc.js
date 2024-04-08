module.exports = {
  extends: ['@voiceflow/eslint-config', '@voiceflow/eslint-config/frontend', '@voiceflow/eslint-config/typescript'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-console': 'off',
  },
};
