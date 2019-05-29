
/*
  Data
*/
export const items = state => state.items
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

export const locales = state => {
  return state.locales
}

export const user = state => {
  return state.user
}
