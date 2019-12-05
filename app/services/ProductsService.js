import * as http from 'tns-core-modules/http'
import ApiService from '@/services/ApiService'
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
          picks: formula.picks,
          icon: formula.icon,
        }
      })
    })
  }

  loadItems () {
    let source = null
    if (doMock) {
      const list = Mocks.items
      console.info(`Returning ${list.length} mocked items`)
      source = Promise.resolve(list)
    } else {
      const url = this.baseUrl + '/products'
      console.log('using url :', url)
      /* headers: this.getHeaders() */
      source = http.request({ url, method: 'GET' }).then(this.validateCode).then(this.getJson)
    }
    return source
  }

  getHeaders (toAppend = {}) {
    return Object.assign({
      'Content-Type': 'application/json',
      Authorization: 'Green ' + this.token,
    },
    toAppend)
  }
}
