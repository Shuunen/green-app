import Vue from 'nativescript-vue'

import * as types from './mutation-types'
import Home from '@/pages/Home'

const mutations = {
  // data
  [types.SET_ITEMS] (state, list) {
    console.log('SET_ITEMS', list)
    state.items = list
  },
  [types.SET_FORMULAS] (state, list) {
    console.log('SET_FORMULAS', list)
    state.formulas = list
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
  // navifation
  [types.TOGGLE_MENU] (state) {
    console.log('TOGGLE_MENU')
    state.toggleMenu = !state.toggleMenu
  },
  [types.GO_HOME] (state) {
    console.log('GO_HOME')
    state.toggleMenu = false
    Vue.prototype.$navigateTo(Home, {
      frame: 'mainContent'
    })
  }
}

export default mutations
