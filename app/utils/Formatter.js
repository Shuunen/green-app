import * as intl from 'nativescript-intl'
import store from '@/store'

export default class Formatter {
  static capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  static price (num) {
    const formatter = new intl.NumberFormat(store.state.locale.code_long, {
      style: 'currency',
      currency: store.state.locale.currency,
      minimumFractionDigits: 2,
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
