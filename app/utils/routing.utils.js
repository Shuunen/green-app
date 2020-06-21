import { Frame } from 'tns-core-modules'

export function navigateTo (component, options) {
  Frame.topmost().currentPage.__vuePageRef__.$navigateTo(component, options)
}
