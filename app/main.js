import Logged from '@/pages/Logged'
import Vue from 'nativescript-vue'
import VueDevtools from 'nativescript-vue-devtools'
import { SVGImage } from '@teammaestro/nativescript-svg'
import VueI18n from 'vue-i18n'
import store from './store'

if (TNS_ENV !== 'production') {
  // Vue.use(VueDevtools, { host: '192.168.0.24' }) if using a real device
  Vue.use(VueDevtools)
}

Vue.registerElement('SVGImage', () => SVGImage)

/* i18n */
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: store.state.locale.code,
  fallbackLocale: store.state.locale.code,
  messages: {
    ar: require('~/locales/ar.json'),
    en: require('~/locales/en.json'),
    es: require('~/locales/es.json'),
    fr: require('~/locales/fr.json'),
  },
})

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)

// Solution 1 : If we want to force login first
// import ApiService from './services/ApiService'
// import Login from './components/Login'
// const apiService = new ApiService()
// const loginFirst = h => h('frame', [h(apiService.isLoggedIn() ? Logged : Login)])

// Solution 2 : simulate connected user
const userLogged = h => h('frame', [h(Logged)])

new Vue({
  render: userLogged,
  store,
  i18n,
}).$start()
