
import pkg from '@/../package.json'
import { showError } from '@/utils'
import { getJSON } from 'tns-core-modules/http'
import { prettyPrint } from '../utils'
import { apiService } from './api.service'

const BASE_URL = pkg.config.api
const timeout = 50000

class HttpService {
  requestErrorHandler (error) {
    let code = 'unknown'
    if (error.message.includes('Unexpected token < in JSON at position 0')) code = 'json-parse-failed'
    else if (error.message.includes('Unable to resolve host')) code = 'cannot-resolve-host'
    console.error(error.message)
    return { error: code }
  }

  async request (method = 'GET', endpoint, data, anonymous = false) {
    if (!endpoint) return console.error('http service missing endpoint')
    const url = BASE_URL + endpoint
    const options = { url, method, headers: this.getHeaders(anonymous), timeout }
    if (data) options.content = JSON.stringify(data)
    console.log(`http service ${method} ${url}`)
    let response = await getJSON(options).catch(this.requestErrorHandler)
    if (typeof response === 'string') {
      response = { data: response }
      console.error('response was not JSON, please fix this on backend side')
    } else if (response.error) {
      console.error('request failed :', prettyPrint(response))
      return showError('error.' + response.error)
    }
    response.ok = true
    console.log('response is ok')
    return response
  }

  async get (endpoint, anonymous) {
    return this.request('GET', endpoint, null, anonymous)
  }

  async patch (endpoint, data, anonymous) {
    // patch is doing a PUT until backend handle patch properly
    return this.request('PUT', endpoint, data, anonymous)
  }

  async post (endpoint, data, anonymous) {
    return this.request('POST', endpoint, data, anonymous)
  }

  getHeaders (anonymous = false) {
    const headers = { 'Content-Type': 'application/json' }
    if (anonymous) return headers
    headers.Authorization = 'Bearer ' + apiService.token.access_token
    return headers
  }
}

export const httpService = new HttpService()
