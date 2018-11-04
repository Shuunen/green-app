import Vue from 'nativescript-vue'
import Vuex from 'vuex'

import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const debug = TNS_ENV !== 'production'

const store = new Vuex.Store({
  state: {
    toggleMenu: false,
    isLoggedIn: false,
    productList: [],
    typeList: [],
    // array of ongoing tasks. We keep track of the tasks to show/hide the
    // activity indicator in the page.
    processingTasks: []
  },
  mutations,
  actions,
  getters,
  strict: debug
})

Vue.prototype.$store = store

export default store
