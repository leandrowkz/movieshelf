/* eslint-disable no-undef */
/** @type {import('eslint').ESLint.ConfigData} */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'spaced-comment': 'error',
    'no-duplicate-imports': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@testing-library/react',
            importNames: ['render', 'screen'],
            message:
              "Import testing functions from useTesting() hook instead.\n\nUsage:\nimport { useTesting } from 'src/hooks/useTesting'\nconst { renderComponent, screen, user } = useTesting()\n",
          },
        ],
      },
    ],
  },
}
