module.exports = {
  extends: 'stylelint-config-recommended-scss',
  rules: {
    'selector-type-no-unknown': [true, {
      ignoreTypes: ['TextField', 'ActionBar'],
    }],
    'property-no-unknown': [true, {
      ignoreProperties: ['placeholder-color', 'horizontal-align'],
    }],
  },
}
