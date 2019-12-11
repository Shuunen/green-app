import Vue from 'nativescript-vue'
import * as types from './mutation-types'
import { i18n } from '@/plugins/i18n'

const showError = error => {
  const code = error.message.includes('.') ? error.message : 'error.unknown'
  alert({
    title: i18n.t('error.alert-title'),
    message: i18n.t(code) + '\n\n' + i18n.t('error.alert-message-suffix', { code }),
  })
}

export const loadFormulas = async ({ commit }) => {
  const task = 'action loadFormulas'
  commit(types.ADD_PROCESSING_TASK, task)
  return Vue.prototype.$apiService.loadFormulas()
    .then(list => commit(types.SET_FORMULAS, list))
    .catch(showError)
    .finally(() => commit(types.REMOVE_PROCESSING_TASK, task))
}

export const loadItems = async ({ commit }) => {
  const task = 'action loadItems'
  commit(types.ADD_PROCESSING_TASK, task)
  return Vue.prototype.$apiService.loadItems()
    .then(list => commit(types.SET_ITEMS, list))
    .catch(showError)
    .finally(() => commit(types.REMOVE_PROCESSING_TASK, task))
}

export const loadStores = async ({ commit }) => {
  const task = 'action loadStores'
  commit(types.ADD_PROCESSING_TASK, task)
  return Vue.prototype.$apiService.loadStores()
    .then(list => commit(types.SET_STORES, list))
    .catch(showError)
    .finally(() => commit(types.REMOVE_PROCESSING_TASK, task))
}

export const toggleMenu = ({ commit }) => {
  console.log('action : toggleMenu')
  commit(types.TOGGLE_MENU)
}

export const doLogin = async ({ commit }, credentials) => {
  const task = 'action doLogin'
  commit(types.ADD_PROCESSING_TASK, task)
  return Vue.prototype.$apiService.doLogin(credentials)
    .then(userData => commit(types.SET_USER, userData))
    .then(() => loadStores({ commit }))
    .then(() => commit(types.DO_LOGIN))
    .catch(showError)
    .finally(() => commit(types.REMOVE_PROCESSING_TASK, task))
}

export const doLogout = ({ commit }) => {
  console.log('action : doLogout')
  commit(types.DO_LOGOUT)
}

export const goHome = ({ commit }) => {
  console.log('action : goHome')
  commit(types.GO_HOME)
}

export const goAccount = ({ commit }) => {
  console.log('action : goAccount')
  commit(types.GO_ACCOUNT)
}

export const goOrders = ({ commit }) => {
  console.log('action : goOrders')
  commit(types.GO_ORDERS)
}

export const startOrder = ({ commit }) => {
  console.log('action : startOrder')
  commit(types.START_ORDER)
}

export const setLocale = ({ commit }, locale) => {
  console.log('action : setLocale')
  commit(types.SET_LOCALE, locale)
}

export const setUser = ({ commit }, user) => {
  console.log('action : setUser')
  commit(types.SET_USER, user)
}
