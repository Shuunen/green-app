import pkg from '@/../package.json'
import { Allergen, Family, OAuthToken, Product, Store, User } from '@/models'
import { i18n, LOCALES, LOCALE_DEFAULT_CODE } from '@/plugins/i18n'
import { prettyPrint, uriFromId, urisFromIds } from '@/utils'
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
    this.families = []
    this.familyNameById = {}
    this.stores = []
    this.products = []
    this.productsByFamilyName = {}
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
    // TODO https://github.com/Shuunen/green-app/issues/220
    // await this.getType('diets', Diet)
    await this.getType('allergens', Allergen)
    await this.getType('families', Family)
    await this.getType('products', Product)
    await this.getType('stores', Store)
    this.genCatalogs()
    return 'ok'
  }

  genCatalogs () {
    this.families.forEach(family => {
      const { id } = family
      if (this.familyNameById[id]) return
      this.familyNameById[id] = family.label
    })
    // { '1': 'base', '2': 'ingredient', '3': 'sauce', '4': 'soup', '5': 'wrap', '6': 'drink', '7': 'dessert' }
    this.products.forEach(product => {
      const familyId = product.family
      const familyName = this.familyNameById[familyId]
      if (!this.productsByFamilyName[familyName]) this.productsByFamilyName[familyName] = []
      this.productsByFamilyName[familyName].push(product)
    })
    // { base: [ [Object], [Object], [Object],... ], ingredient: [...]
  }

  async getType (type, Model) {
    let response = await this.get('/' + type)
    if (response.error) return this.showError('error.' + response.error)
    let items = response['hydra:member'].map(data => new Model(data))
    this[type] = items
    // handle next pages if any -.-''
    while (response['hydra:view'] && response['hydra:view']['hydra:next']) {
      const nextPage = response['hydra:view']['hydra:next']
      response = await this.get(nextPage)
      items = response['hydra:member'].map(data => new Model(data))
      this[type] = this[type].concat(items)
    }
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
    // TODO ajouter les nouveaux champs du compte client
    if (!data.id) return this.showError('error.missing-user-id')
    const url = '/users/' + data.id
    const updates = {
      allergens: urisFromIds('allergens', data.allergens),
      // diets: data.diets, // TODO https://github.com/Shuunen/green-app/issues/220
      firstname: data.firstname,
      lastname: data.lastname,
      locale: data.locale,
      email: data.email,
      address: data.address,
      city: data.city,
      deliveryInformations: data.deliveryInformations,
      telephone: data.telephone,
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
    console.log('doLogin got response', prettyPrint(response))
    if (response.error) return this.showError('error.' + response.error)
    console.log('setting session token')
    this.token = new OAuthToken(response)
    await this.getUserData()
    await this.getCommonData()
    return 'ok'
  }

  async postJSON (url, data) {
    const content = JSON.stringify(data)
    const httpResponse = await request({ url, method: 'POST', headers: { 'Content-Type': 'application/json' }, content }).catch(this.showError)
    const response = httpResponse.content.toJSON()
    response.error = response.handled_error // FIXME https://github.com/Shuunen/green-app/issues/225
    return response
  }

  async doSignup () {
    const { email, password } = this.user
    if (!email || !password) return this.showError('error.missing-data-for-signup')
    const url = `${BASE_URL}/users`
    console.log('creating a user...')
    const response = await this.postJSON(url, { email, username: email, plainPassword: password })
    console.log('doSignup got response', prettyPrint(response))
    if (response.error) return this.showError('error.' + response.error)
    return this.doLogin()
  }

  async doLogout () {
    console.log('doLogout, cleaning session : token, user, ...')
    this.token = {}
    // keep user mail to avoid him type it again
    this.user = new User({ email: this.user.email })
  }

  async showError (error) {
    const message = typeof error === 'string' ? error : error.message
    // TODO: better test than include dot to detect a i18n key
    const code = (message && message.includes('.')) ? message : 'error.unknown'
    alert({
      title: i18n.t('error.alert-title'),
      message: i18n.t(code), // + '\n\n' + i18n.t('error.alert-message-suffix', { code }),
      okButtonText: i18n.t('error.alert-button'),
    })
    return 'KO'
  }

  getHeaders (toAppend = {}) {
    const Authorization = 'Bearer ' + this.token.access_token
    return Object.assign({ 'Content-Type': 'application/json', Authorization }, toAppend)
  }
}

export const apiService = new ApiService()
