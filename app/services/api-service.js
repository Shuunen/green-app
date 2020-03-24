import pkg from '@/../package.json'
import OAuthToken from '@/models/oauth-token'
import { User } from '@/models/user'
import { i18n, LOCALES, LOCALE_DEFAULT_CODE } from '@/plugins/i18n'
import * as Mocks from '@/utils/mocks'
import { getString, setString } from 'tns-core-modules/application-settings'
import { getJSON, request } from 'tns-core-modules/http'

const BASE_URL = pkg.config.api
const doMock = false

class ApiService {
  constructor () {
    this.locales = LOCALES
    this._locale = LOCALE_DEFAULT_CODE
    this.user = new User()
    this.allergens = []
    this.diets = []
    this.formulas = []
    this.items = {}
    this.stores = []
  }

  isSessionActive () {
    console.log('isSessionActive start and getString(token) : ' + getString('token'))
    const active = this.token.isValid()
    console.log('isSessionActive ?', active)
    return active
  }

  get token () {
    const data = getString('token')
    return new OAuthToken(data ? JSON.parse(data) : {})
  }

  set token (newToken) {
    const data = JSON.stringify(new OAuthToken(newToken))
    setString('token', data)
    console.log('TOKEN SET TO: ' + data)
  }

  get locale () {
    return this._locale
  }

  set locale (code) {
    console.log('locale set to : ' + code)
    this._locale = code
    i18n.locale = code
    this.user.locale = code
  }

  async getCommonData () {
    let data = {}
    console.log('getting common data')
    const mockThisForNow = true
    if (doMock || mockThisForNow) {
      await Mocks.sleep(2000)
      data = Mocks.commonData
      console.log('Returning common mocked data')
    } else {
      return this.showError('error.api-needed')
    }
    this.allergens = data.allergens
    this.diets = data.diets
    this.formulas = data.formulas
    this.items = data.items
    this.stores = data.stores
    console.log(`loaded ${this.formulas.length} formulas`)
    return 'ok'
  }

  async getUserData () {
    // this.user = new User(Mocks.users[0])
    const url = `${BASE_URL}/me`
    console.log('getting user data with GET ' + url)
    const response = await getJSON({ url, headers: this.getHeaders() })
    if (response.error) return this.showError('error.' + response.error)
    console.log('successfully got user data with email :', response.email)
    this.user = new User(response)
    return 'ok'
  }

  async doLogin () {
    const { email, password } = this.user
    if (!email || !password) return this.showError('error.missing-data-for-login')
    const url = `${BASE_URL}/oauth/v2/token?grant_type=password&client_id=1_green-app&client_secret=green-app&username=${email}&password=${password}`
    console.log('login in user ' + email)
    const response = await getJSON(url)
    console.log('got response', JSON.stringify(response))
    if (response.error) return this.showError('error.' + response.error)
    console.log('setting session token')
    this.token = new OAuthToken(response)
    await this.getUserData()
    await this.getCommonData()
    return 'ok'
  }

  async doSignup () {
    const { email, password } = this.user
    if (!email || !password) return this.showError('error.missing-data-for-signup')
    const url = `${BASE_URL}/users`
    const content = JSON.stringify({ email, username: email, plainPassword: password })
    console.log('creating a user...')
    const response = await request({ url, method: 'POST', headers: { 'Content-Type': 'application/json' }, content }).catch(this.showError)
    if (response.error) return this.showError('error.' + response.error)
    await this.doLogin()
    return 'ok'
  }

  async doLogout () {
    console.log('doLogout, cleaning session : token, user, ...')
    this.token = {}
    this.user = new User({ email: this.user.email })
  }

  showError (error) {
    const message = typeof error === 'string' ? error : error.message
    // TODO: better test than include dot to detect a i18n key
    const code = (message && message.includes('.')) ? message : 'error.unknown'
    alert({
      title: i18n.t('error.alert-title'),
      message: i18n.t(code), // + '\n\n' + i18n.t('error.alert-message-suffix', { code }),
    })
  }

  getHeaders (toAppend = {}) {
    const Authorization = 'Bearer ' + this.token.accessToken
    return Object.assign({ 'Content-Type': 'application/json', Authorization }, toAppend)
  }
}

export const apiService = new ApiService()
