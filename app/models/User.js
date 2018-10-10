// import validator from 'email-validator'

export default class {
  constructor (email, password) {
    this.email = email || ''
    this.password = password || ''
  }

  isValidEmail () {
    // return validator.validate(this.email)
    return true
  }
}
