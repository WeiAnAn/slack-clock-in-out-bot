module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'no-console': [0],
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
};
