import Vue from 'nativescript-vue'
import VueI18n from 'vue-i18n'
import pkg from '@/../package.json'

export const LOCALES = pkg.config.locales
export const LOCALE_DEFAULT_CODE = LOCALES[pkg.config.default_locale].code

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: LOCALE_DEFAULT_CODE,
  fallbackLocale: LOCALE_DEFAULT_CODE,
  messages: {
    ar: require('@/locales/ar.json'),
    en: require('@/locales/en.json'),
    es: require('@/locales/es.json'),
    fr: require('@/locales/fr.json'),
  },
})
