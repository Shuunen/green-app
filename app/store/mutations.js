import User from '@/models/User'
import Account from '@/pages/Account'
import Formulas from '@/pages/Formulas'
import Home from '@/pages/Home'
import Logged from '@/pages/Logged'
import Login from '@/pages/Login'
import Orders from '@/pages/Orders'
import { topmost } from 'tns-core-modules/ui/frame'
import * as types from './mutation-types'

function navigateTo (page, clearHistory = false, frame = 'mainContent') {
  const options = { clearHistory }
  if (frame) {
    options.frame = frame
  }
  topmost().currentPage.__vuePageRef__.$navigateTo(page, options)
}

const mutations = {
  // data
  [types.SET_ITEMS] (state, list) {
    console.log('SET_ITEMS')
    state.items = list
  },
  [types.SET_FORMULAS] (state, list) {
    console.log('SET_FORMULAS')
    state.formulas = list
  },
  [types.SET_STORES] (state, list) {
    console.log('SET_STORES')
    state.stores = list
  },
  [types.SET_LOCALE] (state, locale) {
    console.log('SET_LOCALE')
    state.locale = locale
  },
  [types.SET_USER] (state, user) {
    console.log('SET_USER', user)
    state.user = new User({ ...state.user, ...user })
  },
  // auth
  [types.DO_LOGIN] (state) {
    console.log('DO_LOGIN')
    state.isLoggedIn = true
    navigateTo(Logged, true, null)
  },
  [types.DO_LOGOUT] (state) {
    console.log('DO_LOGOUT')
    state.isLoggedIn = false
    navigateTo(Login, true, null)
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
    state.toggleMenu = false
    navigateTo(Home)
  },
  [types.GO_ACCOUNT] (state) {
    console.log('GO_ACCOUNT')
    state.toggleMenu = false
    navigateTo(Account)
  },
  [types.GO_ORDERS] (state) {
    console.log('GO_ORDERS')
    state.toggleMenu = false
    navigateTo(Orders)
  },
  [types.START_ORDER] (state) {
    console.log('START_ORDER')
    state.toggleMenu = false
    navigateTo(Formulas)
  },
}

export default mutations
