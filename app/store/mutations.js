import Account from '@/pages/Account'
import Home from '@/pages/Home'
import Orders from '@/pages/Orders'
import * as types from './mutation-types'
import { topmost } from 'tns-core-modules/ui/frame'

function navigateTo (page) {
  topmost().currentPage.__vuePageRef__.$navigateTo(page, {
    frame: 'mainContent'
  })
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
  [types.SET_LOCALE] (state, locale) {
    console.log('SET_LOCALE')
    state.locale = locale
  },
  // auth
  [types.DO_LOGIN] (state) {
    console.log('DO_LOGIN')
    state.isLoggedIn = true
  },
  [types.DO_LOGOUT] (state) {
    console.log('DO_LOGOUT')
    state.isLoggedIn = false
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
  }
}

export default mutations
