import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import security from 'eslint-plugin-security';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  prettier,
  {
    plugins: {
      security,
      import: importPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Type safety
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',

      // Security
      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-eval-with-expression': 'error',

      // Import hygiene
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
        },
      ],

      'no-console': 'off',
    },
  },
);
