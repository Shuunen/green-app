import { handleOpenURL } from 'nativescript-urlhandler'

handleOpenURL((appURL) => {
  console.log('Got the following appURL', appURL)
})
