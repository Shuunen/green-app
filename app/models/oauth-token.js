import { getString, getInteger } from '@/utils'

export default class OAuthToken {
  constructor (data = {}) {
    // console.log('OAuthToken constructor with data', data)
    this.accessToken = getString(data.accessToken || data.access_token)
    this.expiresIn = getInteger(data.expiresIn || data.expires_in)
    this.expiresAt = getInteger(data.expiresAt)
    this.refreshToken = getString(data.refreshToken || data.refresh_token)
    this.scope = getString(data.scope)
    this.tokenType = getString(data.tokenType || data.token_type)
    if (this.expiresIn && this.expiresAt === 0) {
      const hours = Math.round(this.expiresIn / 3600)
      console.log(`token will expires in ${hours} hour(s)`)
      const now = new Date()
      this.expiresAt = now.setHours(now.getHours() + hours)
      console.log(`at ${this.expiresAt}`)
    }
  }

  isValid () {
    const hasToken = this.accessToken.length > 0
    const isNotExpired = this.expiresAt > (new Date()).getTime()
    return (hasToken && isNotExpired)
  }
}
