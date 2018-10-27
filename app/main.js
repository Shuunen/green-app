import Vue from 'nativescript-vue'
import VueDevtools from 'nativescript-vue-devtools'
import Products from './components/Products'
import store from './store'

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools, { host: '192.168.0.24' })
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)

// Solution 1 : If we want to force login first
// import ApiService from './services/ApiService'
// import Login from './components/Login'
// const apiService = new ApiService()
// const loginFirst = h => h('frame', [h(apiService.isLoggedIn() ? Products : Login)])

// Solution 2 : just shows products as a guest user
const guestProducts = h => h('frame', [h(Products)])

new Vue({
  render: guestProducts,
  store
}).$start()
