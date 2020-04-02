import pkg from '@/../package.json'
import Vue from 'nativescript-vue'
import VueI18n from 'vue-i18n'

export const LOCALES = pkg.config.locales
export const LOCALE_DEFAULT_CODE = LOCALES[pkg.config.default_locale].code
const LONG_BY_SHORT_CODE = {}
const CURRENCY_BY_SHORT_CODE = {}
for (const l in LOCALES) {
  LONG_BY_SHORT_CODE[LOCALES[l].code] = LOCALES[l].code_long
  CURRENCY_BY_SHORT_CODE[LOCALES[l].code] = LOCALES[l].currency
}

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: LOCALE_DEFAULT_CODE,
  fallbackLocale: LOCALE_DEFAULT_CODE,
  formatFallbackMessages: true,
  silentFallbackWarn: true,
  messages: {
    ar: require('@/locales/ar.json'),
    en: require('@/locales/en.json'),
    es: require('@/locales/es.json'),
    fr: require('@/locales/fr.json'),
  },
})

export const getLocaleLong = () => LONG_BY_SHORT_CODE[i18n.locale]
export const getLocaleCurrency = () => CURRENCY_BY_SHORT_CODE[i18n.locale]
