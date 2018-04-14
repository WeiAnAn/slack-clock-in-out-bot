module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
};
