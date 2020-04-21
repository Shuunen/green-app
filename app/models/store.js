
export class Store {
  constructor ({ id = 0, menus = [], menu = [], name = '', address = '', phone = '' }) {
    this.id = id
    this.menus = menus.concat(menu)
    this.name = name
    this.address = address
    this.phone = phone
  }
}

/* {
  "@id": "/stores/1",
  "@type": "Store",
  "id": 1,
  "name": "Default store",
  "address": null,
  "phone": null,
  "menu": [
      "/menu_models/5",
      "/menu_models/4",
      "/menu_models/3",
      "/menu_models/2",
      "/menu_models/1"
  ],
  "locale": "/locales/2",
  "currency": "/currencies/2"
} */
