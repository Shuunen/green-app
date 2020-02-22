import { i18n } from '@/plugins/i18n'
import * as intl from 'nativescript-intl'
import { apiService } from '@/services/api-service'

class Formatter {
  $t (key) {
    return i18n.t(key)
  }

  capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  price (num) {
    const formatter = new intl.NumberFormat(apiService.locale.code_long, {
      style: 'currency',
      currency: apiService.locale.currency,
      minimumFractionDigits: 2,
    })
    return formatter.format(num)
  }

  singular (str) {
    if (str.substr(-1) === 's') {
      return str.substr(0, str.length - 1)
    }
    return str
  }

  readableList (items, selection) {
    const list = []
    items.forEach(item => {
      if (selection.includes(item.value)) {
        list.push(this.capitalizeFirstLetter(this.$t(item.title)))
      }
    })
    return list.join(', ')
  }

  prettyPrint (obj) {
    return JSON.stringify(obj, null, 2)
  }
}

export default new Formatter()
