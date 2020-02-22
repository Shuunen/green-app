
import { i18n } from '@/plugins/i18n'

export const getString = value => (value || '') + ''
export const getInteger = value => parseInt(value || 0) || 0
export const getArray = value => Array.from(value || [])
export const currentLocale = () => i18n.locale
export const clone = obj => JSON.parse(JSON.stringify(obj))
