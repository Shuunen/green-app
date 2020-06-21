import ChangePassword from '@/pages/change-password'
import { apiService } from '@/services'
import { navigateTo, showError } from '@/utils'
import { handleOpenURL } from 'nativescript-urlhandler'

handleOpenURL((appURL) => {
  const url = appURL.toString()
  console.log(`Got the following url "${url}"`)
  if (url.includes('reset-password')) {
    console.log('looking for email & token')
    const emailMatch = url.match(/email=([\w@\\.]+)/) || []
    const tokenMatch = url.match(/token=(\w+)/)
    if (emailMatch.length !== 2 || tokenMatch.length !== 2) return showError('error.invalid-reset-link')
    apiService.user.email = emailMatch[1]
    return navigateTo(ChangePassword, { props: { token: tokenMatch[1] } })
  }
  console.log('but its not handled')
})
