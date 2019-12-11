/* global TNS_ENV */
import Logged from '@/pages/Logged'
import Login from '@/pages/Login'
import { i18n } from '@/plugins/i18n'
import ApiService from '@/services/ApiService'
import store from '@/store'
import { SVGImage } from '@teammaestro/nativescript-svg'
import Vue from 'nativescript-vue'

// import VueDevtools from 'nativescript-vue-devtools'
// Vue.use(VueDevtools, { host: '192.168.0.24' }) if using a real device
// Vue.use(VueDevtools)

Vue.registerElement('SVGImage', () => SVGImage)

Vue.config.silent = (TNS_ENV === 'production') // Prints Vue logs when --env.production is *NOT* set while building

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)

const apiService = new ApiService()
Vue.prototype.$apiService = apiService

new Vue({
  render: h => h('frame', [h(apiService.isLoggedIn() ? Logged : Login)]),
  store,
  i18n,
}).$start()
