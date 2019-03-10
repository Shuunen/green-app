import * as intl from 'nativescript-intl'

export default class Formatter {
  static capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  static price (num, locale, currency) {
    const formatter = new intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2
    })
    return formatter.format(num)
  }
}
