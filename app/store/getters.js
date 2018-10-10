
export const productList = state => {
  return state.products
}

export const isProcessing = state => {
  // while there is at least one task processing, return true
  return state.processingTasks.length >= 1
}

export const isLoggedIn = state => {
  return state.isLoggedIn
}
