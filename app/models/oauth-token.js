
export class OAuthToken {
  /* eslint-disable camelcase */
  constructor ({
    accessToken = '', access_token = '',
    expiresIn = 0, expires_in = 0, expiresAt = 0,
    refreshToken = '', refresh_token = '', scope = '',
    tokenType = '', token_type = '',
  }) {
    // console.log('OAuthToken constructor')
    this.accessToken = accessToken || access_token
    this.expiresIn = expiresIn || expires_in
    this.expiresAt = expiresAt
    this.refreshToken = refreshToken || refresh_token
    this.scope = scope
    this.tokenType = tokenType || token_type
    if (this.expiresIn && this.expiresAt === 0) {
      const hours = Math.round(this.expiresIn / 3600)
      console.log(`token will expires in ${hours} hour(s)`)
      const now = new Date()
      this.expiresAt = now.setHours(now.getHours() + hours)
      console.log(`at ${this.expiresAt}`)
    }
  }
  /* eslint-enable camelcase */

  isValid () {
    const hasToken = this.accessToken.length > 0
    const isNotExpired = this.expiresAt > (new Date()).getTime()
    return (hasToken && isNotExpired)
  }
}
