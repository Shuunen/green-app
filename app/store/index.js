import Vue from 'nativescript-vue'
import Vuex from 'vuex'

import pkg from '../../package.json'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const debug = TNS_ENV !== 'production'
const locales = pkg.config.locales
const locale = locales[pkg.config.default_locale]

const store = new Vuex.Store({
  state: {
    debug,
    locales,
    locale,
    toggleMenu: false,
    isLoggedIn: false,
    items: {},
    formulas: [],
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
