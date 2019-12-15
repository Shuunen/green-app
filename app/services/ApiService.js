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

  async loadCommonData () {
    let data = {}
    if (doMock) {
      await Mocks.sleep(2000)
      data = Mocks.commonData
      console.log('Returning common mocked data')
    } else {
      throw new Error('error.api-needed')
      /*
      const url = this.baseUrl + '/products'
      // headers: this.getHeaders()
      data = await http.request({ url, method: 'GET' }).then(this.validateCode).then(this.getJson)
      */
    }
    return data
  }

  async doLogin (credentials) {
    let userData = {}
    if (doMock) {
      await Mocks.sleep(2000)
      userData = Mocks.users[credentials.email]
      if (!userData) {
        throw new Error('error.unknown-account')
      }
    } else {
      throw new Error('error.api-needed')
    }
    return userData // just data, not a User
  }

  async doSignup (data) {
    let userData = {}
    if (doMock) {
      await Mocks.sleep(2000)
      userData = data
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
