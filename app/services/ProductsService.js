import * as http from 'tns-core-modules/http'
import ApiService from '@/services/ApiService'
import Random from '@/utils/Random'
import * as Mocks from '@/utils/Mocks'

const doMock = true

export default class ProductsService extends ApiService {
  loadFormulas () {
    let source = null
    if (doMock) {
      const list = Mocks.formulas
      console.info(`Returning ${list.length} mocked formulas`)
      source = Promise.resolve(list)
    } else {
      console.error('API need to be done')
      source = Promise.resolve([])
    }
    return source.then(data => {
      return data.map(formula => {
        return {
          title: formula.title,
          price: formula.price,
          picks: formula.picks
        }
      })
    })
  }

  loadProducts () {
    let source = null
    if (doMock) {
      const productList = Random.getProducts()
      console.info(`Returning ${productList.length} mocked products`)
      source = Promise.resolve(productList)
    } else {
      const url = this.baseUrl + '/products'
      console.log('using url :', url)
      /* headers: this.getHeaders() */
      source = http.request({ url, method: 'GET' }).then(this.validateCode).then(this.getJson)
    }
    return source.then(data => {
      console.info(data)
      console.info(`Received ${data.length} products from the api`)
      return data.map(product => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          type: product.type
        }
      })
    })
  }

  loadTypes () {
    let source = null
    if (doMock) {
      const typeList = Random.getTypes()
      console.info(`Returning ${typeList.length} mocked types`)
      source = Promise.resolve(typeList)
    } else {
      const url = this.baseUrl + '/types'
      console.log('using url :', url)
      /* headers: this.getHeaders() */
      source = http.request({ url, method: 'GET' }).then(this.validateCode).then(this.getJson)
    }
    return source.then(data => {
      console.info(data)
      console.info(`Received ${data.length} types from the api`)
      return data.map(type => {
        return {
          name: type.name,
          type: type.type
        }
      })
    })
  }

  getHeaders (toAppend = {}) {
    return Object.assign({
      'Content-Type': 'application/json',
      'Authorization': 'Green ' + this.token
    },
    toAppend)
  }
}
