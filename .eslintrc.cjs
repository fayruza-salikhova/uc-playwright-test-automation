module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  env: {
    node: true,
    browser: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'off',
  },
  ignorePatterns: [
    'node_modules/', // игнорируем библиотеки
    'playwright-report/', // игнорируем отчеты Playwright
    '**/*.js', // можно игнорировать сгенерированные js, если нужно
  ],
};
