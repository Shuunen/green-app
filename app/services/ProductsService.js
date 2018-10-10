import * as http from 'tns-core-modules/http'
import ApiService from './ApiService'

export default class ProductsService extends ApiService {
  load () {
    return http.request({
      url: this.baseUrl + '/desserts',
      method: 'GET',
      headers: this.getHeaders()
    })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info(data)
        console.info(`Received ${data.length} products from the api`)
        return data.map(product => {
          return {
            id: product._id,
            name: product.Name,
            price: product.Price
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
