import { getString, setString } from 'tns-core-modules/application-settings'
import ConfigService from '@/services/ConfigService'

const tokenKey = 'token'
const configService = new ConfigService()

export default class ApiService {
  constructor () {
    let apiConfig = configService.loadConfig('api')
    this.baseUrl = apiConfig.baseUrl
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
      console.info('api response : ' + response.content.toString())
      resolve(response.content.toJSON())
    })
      .catch(e => {
        console.error('Error parsing JSON response: ' + e)
        throw e
      })
  }
}
