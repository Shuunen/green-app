// this is a customer order > order menu from /me

import { access } from 'shuutils'

export class UserOrderMenu {
  constructor ({ id = '', price = 0, menu = {}, menuName = '' }) {
    this.id = id
    this.price = price
    this.menuName = menuName || access.default(menu, 'menuModel.label', '')
  }
}

/* {
  "id": 6,
  "items": [...],
  "price": 21,
  "customerOrder": "/customer_orders/6",
  "menu": {
    "id": 14,
    "amount": 1,
    "families": [
      "/families/3"
    ],
    "menuModel": {
      "id": 4,
      "store": "/stores/1",
      "families": [],
      "label": "Green Winter",
      "price": 11.6,
      "active": true,
      "picks": [
        "/menu_picks/12",
        "/menu_picks/13",
        "/menu_picks/14",
        "/menu_picks/15",
        "/menu_picks/16"
      ],
      "icon": "formulas"
    },
    "extraPrice": null
  }
}
*/
