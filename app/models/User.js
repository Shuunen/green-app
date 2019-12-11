// import validator from 'email-validator'

export default class User {
  constructor (data = {}) {
    this.allergies = data.allergies || []
    this.diets = data.diets || []
    this.email = data.email || ''
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
