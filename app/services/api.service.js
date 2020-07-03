import { Allergen, Family, OAuthToken, Store, User } from '@/models'
import { i18n, LOCALES, LOCALE_DEFAULT_CODE } from '@/plugins/i18n'
import { showError, uriFromId, urisFromIds } from '@/utils'
import { getString, setString } from 'tns-core-modules/application-settings'
import { httpService } from './http.service'

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

  async getCommonData () {
    console.log('getting common data')
    // TODO https://github.com/Shuunen/green-app/issues/220
    // await this.getType('diets', Diet)
    await this.getType('allergens', Allergen)
    await this.getType('families', Family)
    await this.getType('stores', Store)
    this.genCatalogs()
    return { ok: true }
  }

  genCatalogs () {
    this.families.forEach(family => {
      const { id } = family
      if (this.familyNameById[id]) return
      this.familyNameById[id] = family.label
    })
    // { '1': 'base', '2': 'ingredient', '3': 'sauce', '4': 'soup', '5': 'wrap', '6': 'drink', '7': 'dessert' }
    this.user.store.products.forEach(product => {
      const familyId = product.family
      const familyName = this.familyNameById[familyId]
      if (!this.productsByFamilyName[familyName]) this.productsByFamilyName[familyName] = []
      this.productsByFamilyName[familyName].push(product)
    })
    // { base: [ [Object], [Object], [Object],... ], ingredient: [...]
    // console.log(prettyPrint(this.productsByFamilyName))
  }

  async getType (type, Model) {
    let response = await httpService.get('/' + type)
    if (response.error) return showError('error.' + response.error)
    let items = response['hydra:member'].map(data => new Model(data))
    this[type] = items
    // handle next pages if any -.-''
    while (response['hydra:view'] && response['hydra:view']['hydra:next']) {
      const nextPage = response['hydra:view']['hydra:next']
      response = await httpService.get(nextPage)
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
    const data = await httpService.get('/me')
    console.log('successfully got user data with email :', data.email)
    console.log('user data', data)
    this.user = new User(data)
    return { ok: true }
  }

  async updateUserData (data) {
    // TODO ajouter les nouveaux champs du compte client
    if (!data.id) return showError('error.missing-user-id')
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
    const status = await httpService.patch(url, updates)
    if (!status.ok) return status
    return this.getUserData()
  }

  async updateUserPassword (plainPassword) {
    const url = '/users/' + this.user.id
    const updates = { plainPassword }
    return httpService.patch(url, updates)
  }

  async doLogin () {
    const { email, password } = this.user
    if (!email || !password) return showError('error.missing-data-for-login')
    const endpoint = `/oauth/v2/token?grant_type=password&client_id=1_green-app&client_secret=green-app&username=${email}&password=${password}`
    console.log('login in user ' + email)
    const response = await httpService.get(endpoint, true)
    if (!response.ok) return response
    console.log('setting session token')
    this.token = new OAuthToken(response)
    const status = await this.getUserData()
    if (!status.ok) return status
    return this.getCommonData()
  }

  async doSignup () {
    const { email, password } = this.user
    if (!email || !password) return showError('error.missing-data-for-signup')
    console.log('creating a user...')
    const status = await httpService.post('/users', { email, username: email, plainPassword: password }, true)
    if (!status.ok) return status
    return this.doLogin()
  }

  async validateOrder (menus) {
    console.log('send ordered menus to api', menus)
    const content = {
      menus,
      store: `${this.user.store}`,
      customer: this.user.email,
    }
    console.log('registering user order...', content)
    const response = await httpService.post('/m/pay', content)
    return response
  }

  async doLogout () {
    console.log('doLogout, cleaning session : token, user, ...')
    this.token = {}
    // keep user mail to avoid him type it again
    this.user = new User({ email: this.user.email })
  }
}

export const apiService = new ApiService()
