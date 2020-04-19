import { prettyPrint } from '@/utils'

export class CustomerOrder {
  constructor ({ id = '', menus = [], store = {}, creationDate = '' }) {
    this.id = id
    this.menus = menus
    this.store = store
    this.creationDate = creationDate
    console.log('a customer order has been created', prettyPrint(this))
  }
}

/* {
  "@context": "/contexts/CustomerOrder",
  "@id": "/customer_orders/6",
  "@type": "CustomerOrder",
  "id": 6,
  "menus": [
    "/order_menus/6"
  ],
  "store": {
    "id": 1,
    "name": "Default store",
    ...
  },
  "creationDate": "2020-04-04T10:11:12+00:00",
  "customer": "/users/9"
} */
