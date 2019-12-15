import { i18n } from '@/plugins/i18n'

// import validator from 'email-validator'

export default class User {
  constructor (data = {}) {
    this.allergens = data.allergens || []
    this.diets = data.diets || []
    this.email = data.email || ''
    this.locale = data.locale || i18n.locale
    this.password = data.password || ''
    this.firstName = data.firstName || ''
    this.lastName = data.lastName || ''
    this.password = data.password || ''
    this.store = data.store || ''
  }

  isValidEmail () {
    // return validator.validate(this.email)
    return (this.email.length > 0)
  }

  isValidPassword () {
    return (this.password.length > 0)
  }
}
