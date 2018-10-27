import { getString, setString } from 'tns-core-modules/application-settings'

const tokenKey = 'token'

export default class ApiService {
  constructor () {
    this.baseUrl = 'http://192.168.0.24:1337'
    this.appUserHeader = 'Basic agreatheader'
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
      console.info('Content: ' + response.content.toString())
      resolve(response.content.toJSON())
    })
      .catch(e => {
        console.error('Error parsing JSON response: ' + e)
        throw e
      })
  }
}
