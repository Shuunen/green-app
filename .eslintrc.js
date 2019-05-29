const rules = require('./.eslintrc.rules')

module.exports = {
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'standard',
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
