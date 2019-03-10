
export const productList = state => {
  return state.productList
}

export const typeList = state => {
  return state.typeList
}

export const isProcessing = state => {
  // while there is at least one task processing, return true
  return state.processingTasks.length >= 1
}

export const isLoggedIn = state => {
  return state.isLoggedIn
}

export const toggleMenu = state => {
  return state.toggleMenu
}

export const locale = state => {
  return state.locale
}

export const currency = state => {
  return state.currency
}
