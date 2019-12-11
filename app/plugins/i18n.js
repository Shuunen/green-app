import Vue from 'nativescript-vue'
import VueI18n from 'vue-i18n'
import pkg from '@/../package.json'

const locales = pkg.config.locales
const locale = locales[pkg.config.default_locale]

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: locale.code,
  fallbackLocale: locale.code,
  messages: {
    ar: require('@/locales/ar.json'),
    en: require('@/locales/en.json'),
    es: require('@/locales/es.json'),
    fr: require('@/locales/fr.json'),
  },
})
