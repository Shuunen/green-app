import Vue from 'nativescript-vue'
import VueDevtools from 'nativescript-vue-devtools'
import Landing from './pages/Landing'
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
// const loginFirst = h => h('frame', [h(apiService.isLoggedIn() ? Landing : Login)])

// Solution 2 : just shows Landing as a guest user
const guestLanding = h => h('frame', [h(Landing)])

new Vue({
  render: guestLanding,
  store
}).$start()
