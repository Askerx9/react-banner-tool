module.exports = {
    extends: [
      'eslint:recommended',
      'plugin:typescript-sort-keys/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'next/core-web-vitals',,
      'prettier'
    ],
    parser: '@typescript-eslint/parser',
    overrides: [
      {
        extends: [
          'plugin:@typescript-eslint/recommended',
          'plugin:@typescript-eslint/recommended-requiring-type-checking'
        ],
        files: ['*.ts', '*.tsx'],
        parserOptions: {
          project: 'tsconfig.json'
        }
      }
    ],
    parserOptions: {
      project: './tsconfig.json'
    },
    rules: {
      /* --- Regular rules --- */
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn', // or "error"
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
  