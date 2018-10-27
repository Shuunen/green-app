import * as http from 'tns-core-modules/http'
import ApiService from './ApiService'

export default class ProductsService extends ApiService {
  load () {
    const url = this.baseUrl + '/products'
    console.log('using url :', url)
    return http.request({
      url,
      method: 'GET'
      // headers: this.getHeaders()
    })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info(data)
        console.info(`Received ${data.length} products from the api`)
        return data.map(product => {
          return {
            id: product._id,
            name: product.name,
            price: product.price,
            type: product.type
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
