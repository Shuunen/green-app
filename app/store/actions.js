import * as types from './mutation-types'
import ProductsService from '@/services/ProductsService'

const productsService = new ProductsService()

export const loadProducts = ({ commit }) => {
  const task = 'action loadProducts'
  console.log(task)
  return new Promise((resolve, reject) => {
    commit(types.ADD_PROCESSING_TASK, task)
    productsService
      .load()
      .then(products => {
        commit(types.SET_PRODUCTS, products)
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

export const openMenu = ({ commit }) => {
  console.log('action : openMenu')
  commit(types.OPEN_MENU)
}

export const doLogout = ({ commit }) => {
  console.log('action : doLogout')
  commit(types.DO_LOGOUT)
}
