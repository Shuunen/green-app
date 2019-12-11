const rules = require('./.eslintrc.rules')

module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:vue/recommended',
    'plugin:vue-i18n/recommended',
  ],
  rules,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
  },
  settings: {
    'vue-i18n': {
      localeDir: './app/locales/*.json'
    }
  }
}
