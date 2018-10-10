import Vue from 'nativescript-vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoggedIn: false
  },
  mutations: {
    doLogin: state => (state.isLoggedIn = true),
    doLogout: state => (state.isLoggedIn = false)
  }
})

export default store
