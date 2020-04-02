import { i18n, getLocaleLong, getLocaleCurrency } from '@/plugins/i18n'
import * as intl from 'nativescript-intl'

class Formatter {
  $t (key) {
    return i18n.t(key)
  }

  capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  price (num) {
    const options = { style: 'currency', currency: getLocaleCurrency(), minimumFractionDigits: 2 }
    const formatter = new intl.NumberFormat(getLocaleLong(), options)
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

  readableDate (dateStr = new Date().toISOString()) {
    // dateStr is like       "2020-04-01T17:02:45+00:00"
    // but ISOString is like "2018-04-02T17:26:11.182Z"
    const date = new Date(dateStr)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const str = new intl.DateTimeFormat(getLocaleLong(), options).format(date)
    console.log('readable date :', str)
    return str
  }

  prettyPrint (obj) {
    return JSON.stringify(obj, null, 2)
  }
}

export default new Formatter()
