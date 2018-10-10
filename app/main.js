import Vue from 'nativescript-vue'
import VueDevtools from 'nativescript-vue-devtools'
import ApiService from './services/ApiService'
import Login from './components/Login'
import Products from './components/Products'
import store from './store'

const apiService = new ApiService()

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools, { host: '192.168.0.24' })
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)

new Vue({
  render: h => h('frame', [h(apiService.isLoggedIn() ? Products : Login)]),
  store
}).$start()
