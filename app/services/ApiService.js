import { getString, setString } from 'tns-core-modules/application-settings'
import * as Mocks from '@/utils/Mocks'

const tokenKey = 'token'
const doMock = true

export default class ApiService {
  constructor () {
    this.baseUrl = 'http://192.168.0.24:1337'
    this.appUserHeader = 'Basic a-great-header'
  }

  isLoggedIn () {
    console.log('GETTING TOKEN LOGGED IN: ' + getString(tokenKey))
    return !!getString(tokenKey)
  }

  get token () {
    console.log('GETTING TOKEN: ' + getString(tokenKey))
    return getString(tokenKey)
  }

  set token (newToken) {
    setString(tokenKey, newToken)
    console.log('TOKEN SET TO: ' + newToken)
  }

  validateCode (response) {
    return new Promise((resolve, reject) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        resolve(response)
      }
      const message = 'Response with code: ' + response.statusCode + '\nContent: ' + response.content.toString()
      console.log(message)
      reject(new Error(message))
    })
  }

  getJson (response) {
    return new Promise((resolve, reject) => {
      console.info('api response : ' + response.content.toString())
      resolve(response.content.toJSON())
    }).catch(e => Promise.reject(new Error('error.json-parse-failed')))
  }

  async loadStores () {
    let list = []
    if (doMock) {
      await Mocks.sleep(1000)
      list = Mocks.stores
      console.log(`Returning ${list.length} mocked stores`)
    } else {
      throw new Error('error.api-needed')
    }
    return list // TODO: stores should be an array of store object
  }

  async loadFormulas () {
    let list = []
    if (doMock) {
      await Mocks.sleep(2000)
      list = Mocks.formulas
      console.log(`Returning ${list.length} mocked formulas`)
    } else {
      throw new Error('error.api-needed')
    }
    return list.map(formula => ({
      title: formula.title,
      price: formula.price,
      picks: formula.picks,
      icon: formula.icon,
    }))
  }

  async loadItems () {
    let list = []
    if (doMock) {
      await Mocks.sleep(2000)
      list = Mocks.items
      console.info(`Returning ${list.length} mocked items`)
    } else {
      throw new Error('error.api-needed')
      /*
      const url = this.baseUrl + '/products'
      // headers: this.getHeaders()
      list = await http.request({ url, method: 'GET' }).then(this.validateCode).then(this.getJson)
      */
    }
    return list // TODO: should map like formulas to ensure mapping, or a class
  }

  async doLogin (credentials) {
    let userData = {}
    if (doMock) {
      await Mocks.sleep(3000)
      userData = Mocks.users[credentials.email]
      if (!userData) {
        throw new Error('error.unknown-account')
      }
    } else {
      throw new Error('error.api-needed')
    }
    return userData // just data, not a User
  }

  getHeaders (toAppend = {}) {
    return Object.assign({
      'Content-Type': 'application/json',
      Authorization: 'Green ' + this.token,
    }, toAppend)
  }
}
