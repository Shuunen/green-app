export class MenuModel {
  constructor ({ id = 0, label = '', price = 0, icon = 'formulas', picks = [] }) {
    this.id = id
    this.label = label
    this.price = price
    this.picks = picks
    this.icon = icon
  }
}

/* {
  '@context': '/contexts/MenuModel',
  '@id': '/menu_models/1',
  '@type': 'MenuModel',
  id: 1,
  store: '/stores/1',
  families: [],
  label: 'Green Rush',
  price: 9.4,
  active: true,
  picks: [
    '/menu_picks/1',
    '/menu_picks/2',
    '/menu_picks/3',
  ],
  icon: 'formulas',
} */
