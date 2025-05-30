module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    'vitest-globals/env': true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:vitest-globals/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'indent': [
      "error",
      2
    ],
    'linebreak-style': [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "never"
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "arrow-spacing": [
      "error",
      { before: true, after: true }
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "no-console": 0,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": 0,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ]
  },
}
