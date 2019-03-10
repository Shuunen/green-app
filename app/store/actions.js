import * as types from './mutation-types'
import ProductsService from '@/services/ProductsService'

const productsService = new ProductsService()

export const loadProducts = ({ commit }) => {
  const task = 'action loadProducts'
  console.log(task)
  return new Promise((resolve, reject) => {
    commit(types.ADD_PROCESSING_TASK, task)
    productsService
      .loadProducts()
      .then(productList => {
        commit(types.SET_PRODUCTS, productList)
        commit(types.REMOVE_PROCESSING_TASK, task)
        resolve()
      })
      .catch(error => {
        console.error(`Failed at loading products from api : ${error}`)
        commit(types.REMOVE_PROCESSING_TASK, task)
        reject(error)
      })
  })
}

export const loadTypes = ({ commit }) => {
  const task = 'action loadTypes'
  console.log(task)
  return new Promise((resolve, reject) => {
    commit(types.ADD_PROCESSING_TASK, task)
    productsService
      .loadTypes()
      .then(typeList => {
        commit(types.SET_TYPES, typeList)
        commit(types.REMOVE_PROCESSING_TASK, task)
        resolve()
      })
      .catch(error => {
        console.error(`Failed at loading types from api : ${error}`)
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
