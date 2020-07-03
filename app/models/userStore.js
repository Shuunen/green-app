import { MenuModel, Product } from '@/models'

export class UserStore {
  constructor ({ id, menus, products }) {
    this.id = id || 0
    this.menus = (menus || []).map(m => new MenuModel(m))
    this.products = (products || []).map(p => new Product(p))
  }
}

/* {
  "id": 9,
  "name": "green Edgewater",
  "address": "926 Furman Street, Flintville, Alabama, 2053",
  "phone": "+33685456625",
  "menus": [ { ... }, ...  ],
  "locale": "/locales/14",
  "currency": "/currencies/519",
  "products": [ { ... }, ... ],
  "city": null,
  "active": true
} */
