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
  static singular (str) {
    if (str.substr(-1) === 's') {
      return str.substr(0, str.length - 1)
    }
    return str
  }
}
