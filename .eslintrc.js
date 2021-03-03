module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    ENV: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    // "indent": [
    //   "error",
    //   4
    // ],
    'linebreak-style': ['off', 'unix'],
    quotes: ['off', 'single'],
    'no-unused-vars': 'off',
    // "semi": [
    //   "error",
    //   "always"
    // ]
  },
}
