/* global TNS_ENV */
import Home from '@/pages/home'
import PreLogin from '@/pages/pre-login'
import '@/plugins/components'
import { i18n } from '@/plugins/i18n'
import '@/plugins/url-handler'
import { apiService } from '@/services'
import { SVGImage } from '@teammaestro/nativescript-svg'
import Vue from 'nativescript-vue'

Vue.registerElement('SVGImage', () => SVGImage)

Vue.config.silent = (TNS_ENV === 'production') // Prints Vue logs when --env.production is *NOT* set while building

new Vue({
  render: h => h('Frame', [h(apiService.isSessionActive() ? Home : PreLogin)]),
  i18n,
}).$start()
