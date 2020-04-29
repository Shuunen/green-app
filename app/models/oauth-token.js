
export class OAuthToken {
  /* eslint-disable camelcase */
  constructor ({ access_token, expires_in, expires_at }) {
    this.access_token = access_token || ''
    this.expires_in = expires_in || 0
    this.expires_at = expires_at || 0
    if (this.expires_in && this.expires_at === 0) {
      const hours = Math.round(this.expires_in / 3600)
      console.log(`token will expires in ${hours} hour(s)`)
      const now = new Date()
      this.expires_at = now.setHours(now.getHours() + hours)
      console.log(`at ${this.expires_at}`)
    }
  }

  isValid () {
    const hasToken = this.access_token.length > 0
    const isNotExpired = this.expires_at > (new Date()).getTime()
    return (hasToken && isNotExpired)
  }
}
