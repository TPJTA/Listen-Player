module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'plugin:flowtype/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  parser: 'vue-eslint-parser',
  plugins: [
    'vue',
    'flowtype'
  ],
  rules: {
    radix: 0,
    'linebreak-style': [0, 'error', 'windows'],
    'no-unused-vars': 1,
    'no-underscore-dangle': 0,
    camelcase: 0,
    'no-param-reassign': 0,
    'new-cap': 0,
    'no-plusplus': 0,
  },
};
