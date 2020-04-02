import { currentLocale, getArray, getString } from '@/utils'
import Formatter from '@/utils/formatter'
import validator from 'email-validator'
import { Order } from './order'

export class User {
  get hasValidPassword () {
    return this.password.length > 0
  }

  get hasValidEmail () {
    return this.email.length > 0 && validator.validate(this.email)
  }

  get storeLabel () {
    return 'Restaurant Green 44300'
  }

  constructor (data = {}) {
    this.allergens = getArray(data.allergens)
    this.diets = getArray(data.diets)
    this.email = getString(data.email)
    this.firstName = getString(data.firstName)
    this.id = getString(data['@id'])
    this.lastName = getString(data.lastName)
    this.password = getString(data.password)
    this.locale = data.locale || currentLocale()
    this.store = getString(data.store)
    this.orders = getArray(data.orders).map(o => new Order(o))
    if (!this.firstName) {
      this.detectNamesFromEmail()
    }
  }

  detectNamesFromEmail () {
    const names = (this.email.split('@')[0] || '').split('.')
    if (!names || !names.length) return
    if (names[0]) {
      this.firstName = Formatter.capitalizeFirstLetter(names[0])
    }
    if (names[1]) {
      this.lastName = Formatter.capitalizeFirstLetter(names[1])
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
