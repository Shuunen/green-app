
export class Store {
  constructor ({ id, name, address, phone }) {
    this.id = id || 0
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
