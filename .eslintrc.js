const rules = require('./.eslintrc.rules')

module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:vue/recommended',
  ],
  globals: {
    TNS_ENV: 'readonly'
  },
  rules,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
  },
}
