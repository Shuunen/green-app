import { UserCustomerOrder } from '@/models'
import { i18n } from '@/plugins/i18n'
import { apiService } from '@/services'
import { capitalizeFirstLetter, idFromUri } from '@/utils'
import validator from 'email-validator'

export class User {
  get hasValidPassword () {
    return this.password.length > 0
  }

  get hasValidEmail () {
    return this.email.length > 0 && validator.validate(this.email)
  }

  get storeLabel () {
    if (!this.store) return ''
    const store = apiService.stores.find(s => s.id === this.store)
    if (store) return store.name
    console.error('cant find store with id :', this.store)
    return ''
  }

  // defaults in args only works with undefined values -.- need to default below to handle undefined & null values
  constructor ({ allergens, diets, email, id, firstname, lastname, password, locale, store, orders }) {
    this.allergens = allergens || []
    this.diets = diets || []
    this.email = email || ''
    this.firstname = firstname || ''
    this.id = id || 0
    this.lastname = lastname || ''
    this.password = password || ''
    this.locale = locale || i18n.locale
    this.store = idFromUri(store)
    this.orders = (orders || []).map(o => new UserCustomerOrder(o))
    if (!this.firstname) this.detectNamesFromEmail()
  }

  detectNamesFromEmail () {
    const names = (this.email.split('@')[0] || '').split('.')
    if (!names || !names.length) return
    if (names[0]) {
      this.firstname = capitalizeFirstLetter(names[0])
    }
    if (names[1]) {
      this.lastname = capitalizeFirstLetter(names[1])
    }
  }
}

/* example user from API :
{
  "@context": "/contexts/User",
  "@id": "/users/35",
  "@type": "User",
  "store": "/stores/1",
  "roles": [
    "ROLE_USER"
  ],
  "id": 35,
  "username": "romain.racamier@gmail.com",
  "usernameCanonical": "romain.racamier@gmail.com",
  "salt": null,
  "email": "romain.racamier@gmail.com",
  "emailCanonical": "romain.racamier@gmail.com",
  "password": "$2y$13$n3jJ60jbV3s27KCj8J7S6.4y5wHX1Zj6ssZkZB7h2ev6e1N2i",
  "plainPassword": null,
  "lastLogin": null,
  "confirmationToken": null,
  "accountNonExpired": true,
  "accountNonLocked": true,
  "credentialsNonExpired": true,
  "enabled": true,
  "superAdmin": false,
  "passwordRequestedAt": null,
  "groups": [],
  "groupNames": []
}
*/
