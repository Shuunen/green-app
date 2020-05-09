/*
  Custom rules for this project
*/
module.exports = {
  'no-console': 'off',
  'vue/max-attributes-per-line': 'off',
  'vue/singleline-html-element-content-newline': 'off',
  'vue/attribute-hyphenation': 'off',
  'vue-i18n/no-missing-keys': 'off',
  'vue-i18n/no-unused-keys': ['error', {
    extensions: ['.js', '.vue'],
  }],
  'comma-dangle': ['error', 'always-multiline'],
}
