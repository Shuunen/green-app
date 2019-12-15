/* global TNS_ENV */
import User from '@/models/User'
import { LOCALES, LOCALE_DEFAULT_CODE } from '@/plugins/i18n'
import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const debug = TNS_ENV !== 'production'

const store = new Vuex.Store({
  state: {
    debug,
    locales: LOCALES,
    locale: LOCALE_DEFAULT_CODE,
    user: debug ? new User({}) : {},
    toggleMenu: false,
    isLoggedIn: false,
    // common data from API
    allergens: [],
    diets: [],
    formulas: [],
    items: {},
    stores: [],
    // array of ongoing tasks. We keep track of the tasks to show/hide the
    // activity indicator in the page.
    processingTasks: [],
  },
  mutations,
  actions,
  getters,
  strict: debug,
})

// Vue.prototype.$store = store // does not seems to be used

export default store
