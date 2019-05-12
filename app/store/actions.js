import ProductsService from '@/services/ProductsService'
import * as types from './mutation-types'

const productsService = new ProductsService()

export const loadFormulas = ({ commit }) => {
  const task = 'action loadFormulas'
  console.log(task)
  return new Promise((resolve, reject) => {
    commit(types.ADD_PROCESSING_TASK, task)
    productsService
      .loadFormulas()
      .then(list => {
        commit(types.SET_FORMULAS, list)
        commit(types.REMOVE_PROCESSING_TASK, task)
        resolve()
      })
      .catch(error => {
        console.error(`Failed at loading formulas from api : ${error}`)
        commit(types.REMOVE_PROCESSING_TASK, task)
        reject(error)
      })
  })
}

export const loadItems = ({ commit }) => {
  const task = 'action loadItems'
  console.log(task)
  return new Promise((resolve, reject) => {
    commit(types.ADD_PROCESSING_TASK, task)
    productsService
      .loadItems()
      .then(list => {
        commit(types.SET_ITEMS, list)
        commit(types.REMOVE_PROCESSING_TASK, task)
        resolve()
      })
      .catch(error => {
        console.error(`Failed at loading items from api : ${error}`)
        commit(types.REMOVE_PROCESSING_TASK, task)
        reject(error)
      })
  })
}

export const toggleMenu = ({ commit }) => {
  console.log('action : toggleMenu')
  commit(types.TOGGLE_MENU)
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
