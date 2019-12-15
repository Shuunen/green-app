
/*
  ISO data
*/
export const allergens = state => state.allergens
export const diets = state => state.diets
export const formulas = state => state.formulas
export const isLoggedIn = state => state.isLoggedIn
export const items = state => state.items
export const locale = state => state.locale
export const locales = state => state.locales
export const processingTasks = state => state.processingTasks
export const stores = state => state.stores
export const toggleMenu = state => state.toggleMenu
export const user = state => state.user

/*
  Computed data
*/
export const isLoading = state => {
  // while there is at least one task processing, return true
  return state.processingTasks.length >= 1
}
