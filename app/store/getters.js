
/*
  Data
*/
export const productList = state => state.productList
export const typeList = state => state.typeList
export const formulas = state => state.formulas

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
