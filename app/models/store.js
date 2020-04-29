import { MenuModel } from './menuModel'

export class Store {
  constructor ({ id, menus, name, address, phone }) {
    this.id = id || 0
    this.menus = (menus || []).map(m => new MenuModel(m))
    this.name = name || ''
    this.address = address || ''
    this.phone = phone || ''
  }
}

/* {
  "@id": "/stores/1",
  "@type": "Store",
  "id": 1,
  "name": "Default store",
  "address": null,
  "phone": null,
  "menu": [...],
  "locale": "/locales/2",
  "currency": "/currencies/2"
} */
