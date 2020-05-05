import pkg from '@/../package.json'
import { Allergen, OAuthToken, Product, Store, User } from '@/models'
import { i18n, LOCALES, LOCALE_DEFAULT_CODE } from '@/plugins/i18n'
import { commonData, uriFromId, urisFromIds } from '@/utils'
import { getString, setString } from 'tns-core-modules/application-settings'
import { getJSON, request } from 'tns-core-modules/http'

const BASE_URL = pkg.config.api
const timeout = 5000

class ApiService {
  constructor () {
    this.locales = LOCALES
    this._locale = LOCALE_DEFAULT_CODE
    this.user = new User({})
    this.allergens = []
    this.diets = []
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

  async get (endpoint) {
    const url = BASE_URL + endpoint
    console.log('apiService get with url :', url)
    return getJSON({ url, headers: this.getHeaders(), timeout })
  }

  async patch (endpoint, data) {
    const url = BASE_URL + endpoint
    const content = JSON.stringify(data)
    const response = await getJSON({ url, method: 'PUT', content, headers: this.getHeaders(), timeout })
    if (response.error) return this.showError('error.' + response.error)
    return 'ok'
  }

  async getCommonData () {
    console.log('getting common data')
    this.items = commonData.items
    // TODO https://github.com/Shuunen/green-app/issues/220
    // await this.getType('diets', Diet)
    await this.getType('allergens', Allergen)
    await this.getType('products', Product)
    await this.getType('stores', Store)
    return 'ok'
  }

  async getType (type, Model) {
    const response = await this.get('/' + type)
    if (response.error) return this.showError('error.' + response.error)
    this[type] = response['hydra:member'].map(data => new Model(data))
    console.log(`loaded ${this[type].length} ${type}`)
    /**
     * Note : storing stores like this in array is not great, always need to .find to get one is pretty fat
     * should move to "object" map :
     * response['hydra:member'].reduce((map, obj) => (map[obj.id] = new Store(obj), map), {})
     * or to a real map with :
     * response['hydra:member'].reduce((map, obj) => (map.set(obj.id, new Store(obj)), map), new Map())
     */
  }

  async getUserData () {
    const response = await this.get('/me')
    if (response.error) return this.showError('error.' + response.error)
    console.log('successfully got user data with email :', response.email)
    this.user = new User(response)
    return 'ok'
  }

  async updateUserData (data) {
    if (!data.id) return this.showError('error.missing-user-id')
    const url = '/users/' + data.id
    const updates = {
      allergens: urisFromIds('allergens', data.allergens),
      // diets: data.diets, // TODO https://github.com/Shuunen/green-app/issues/220
      firstname: data.firstname,
      lastname: data.lastname,
      locale: data.locale,
      store: uriFromId('stores', data.store),
    }
    const status = await this.patch(url, updates)
    if (status === 'ok') await this.getUserData()
    else console.error('patch failed')
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
    // keep user mail to avoid him type it again
    this.user = new User({ email: this.user.email })
  }

  showError (error) {
    const message = typeof error === 'string' ? error : error.message
    // TODO: better test than include dot to detect a i18n key
    const code = (message && message.includes('.')) ? message : 'error.unknown'
    alert({
      title: i18n.t('error.alert-title'),
      message: i18n.t(code), // + '\n\n' + i18n.t('error.alert-message-suffix', { code }),
      okButtonText: i18n.t('error.alert-button'),
    })
  }

  getHeaders (toAppend = {}) {
    const Authorization = 'Bearer ' + this.token.access_token
    return Object.assign({ 'Content-Type': 'application/json', Authorization }, toAppend)
  }
}

export const apiService = new ApiService()
