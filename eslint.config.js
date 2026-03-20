import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

/**
 * ESLint 9 flat config.
 * eslint-plugin-react-hooks v5+ uses `configs['recommended-latest']` for flat config
 * (there is no `configs.flat.recommended`).
 */
export default [
  {
    ignores: [
      'dist/**',
      // Flutter web + CanvasKit bundles (third-party / generated; do not lint)
      'public/precision-pilot/**',
      'public/precision-pilot-test/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['vite.config.js', 'scripts/**/*.mjs'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['vite.config.js'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // Without this, `no-unused-vars` flags `motion` in `<motion.div />` (framer-motion)
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
]
