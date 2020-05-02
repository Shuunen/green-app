import { getLocaleCurrency, getLocaleLong, i18n } from '@/plugins/i18n'
import * as intl from 'nativescript-intl'
import { inspect } from 'util'

export const $t = key => i18n.t(key)

export const capitalizeFirstLetter = str => (str.charAt(0).toUpperCase() + str.slice(1))

export const readablePrice = num => {
  const options = { style: 'currency', currency: getLocaleCurrency(), minimumFractionDigits: 2 }
  const formatter = new intl.NumberFormat(getLocaleLong(), options)
  return formatter.format(num)
}

export const singular = str => (str.substr(-1) === 's') ? str.substr(0, str.length - 1) : str

export const readableList = (items, selection) => {
  const list = []
  items.forEach(item => {
    if (selection.includes(item.value)) {
      list.push(capitalizeFirstLetter($t(item.title)))
    }
  })
  return list.join(', ')
}

export const readableDate = (dateStr = new Date().toISOString()) => {
  // dateStr is like       "2020-04-01T17:02:45+00:00"
  // but ISOString is like "2018-04-02T17:26:11.182Z"
  const date = new Date(dateStr)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const str = new intl.DateTimeFormat(getLocaleLong(), options).format(date)
  console.log('readable date :', str)
  return str
}

// showProxy: true, showHidden: true, getters: true
export const prettyPrint = obj => inspect(obj, { depth: 1, colors: true })

//            4 => 4
//         null => 0
//           "" => 0
// "/stores/42" => 42
export const idFromUri = (input = 0) => (typeof input === 'number' ? input : (parseInt(input.split('/')[2]) || 0))
