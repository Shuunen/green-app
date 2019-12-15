import User from '@/models/User'
import Account from '@/pages/Account'
import Formulas from '@/pages/Formulas'
import Home from '@/pages/Home'
import Logged from '@/pages/Logged'
import Login from '@/pages/Login'
import Orders from '@/pages/Orders'
import Signup from '@/pages/Signup'
import { i18n } from '@/plugins/i18n'
import { topmost } from 'tns-core-modules/ui/frame'
import * as types from './mutation-types'

function navigateTo (state, page, clearHistory = false, frame = 'mainContent') {
  // first close menu on navigation
  state.toggleMenu = false
  // clear history if necessary
  const options = { clearHistory }
  // navigate in a frame if any specified
  if (frame) {
    options.frame = frame
  }
  topmost().currentPage.__vuePageRef__.$navigateTo(page, options)
}

function setLocale (state, code) {
  state.locale = code
  i18n.locale = code
  state.user.locale = code
}

const mutations = {
  // data
  [types.SET_COMMON_DATA] (state, data) {
    console.log('SET_COMMON_DATA')
    state.allergens = data.allergens
    state.diets = data.diets
    state.formulas = data.formulas
    state.items = data.items
    state.stores = data.stores
  },
  [types.SET_LOCALE] (state, code) {
    console.log('SET_LOCALE', code)
    setLocale(state, code)
  },
  [types.SET_USER] (state, user) {
    console.log('SET_USER', JSON.stringify(user, null, 2))
    setLocale(state, user.locale)
    state.user = new User({ ...state.user, ...user })
  },
  // auth
  [types.DO_LOGIN] (state) {
    console.log('DO_LOGIN')
    state.isLoggedIn = true
    navigateTo(state, Logged, true, null)
  },
  [types.DO_LOGOUT] (state) {
    console.log('DO_LOGOUT')
    state.isLoggedIn = false
    navigateTo(state, Login, true, null)
  },
  [types.DO_SIGNUP] (state) {
    console.log('DO_SIGNUP')
  },
  // tasks
  [types.ADD_PROCESSING_TASK] (state, task) {
    console.log('ADD_PROCESSING_TASK', task)
    state.processingTasks.push(task)
  },
  [types.REMOVE_PROCESSING_TASK] (state, task) {
    console.log('REMOVE_PROCESSING_TASK', task)
    state.processingTasks.splice(state.processingTasks.indexOf(task), 1)
  },
  // navigation
  [types.TOGGLE_MENU] (state) {
    console.log('TOGGLE_MENU')
    state.toggleMenu = !state.toggleMenu
  },
  [types.GO_HOME] (state) {
    console.log('GO_HOME')
    navigateTo(state, Home)
  },
  [types.GO_ACCOUNT] (state) {
    console.log('GO_ACCOUNT')
    navigateTo(state, Account)
  },
  [types.GO_ORDERS] (state) {
    console.log('GO_ORDERS')
    navigateTo(state, Orders)
  },
  [types.START_ORDER] (state) {
    console.log('START_ORDER')
    navigateTo(state, Formulas)
  },
  [types.START_SIGNUP] (state) {
    console.log('START_SIGNUP')
    navigateTo(state, Signup, false, null)
  },
}

export default mutations
