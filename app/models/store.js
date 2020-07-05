
export class Store {
  constructor ({ id, name, address, phone, active }) {
    this.id = id || 0
    this.name = name || ''
    this.address = address || ''
    this.phone = phone || ''
    this.active = active || false
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
  "currency": "/currencies/2",
  "active": true
} */
