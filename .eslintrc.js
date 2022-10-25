module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // 自定义你的规则
    '@typescript-eslint/consistent-type-definitions': 0,
    'no-undef': 0,
    'max-nested-callbacks': 'off',
    'no-console': 'warn',
    '@typescript-eslint/no-shadow': 0,
    'react/no-unstable-nested-components': 0,
    'react/jsx-curly-brace-presence': 0,
    '@typescript-eslint/no-empty-function': 0,
  },
}
