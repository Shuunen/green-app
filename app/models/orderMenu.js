
export class OrderMenu {
  constructor ({ id = '', items = [], price = 0 }) {
    this.id = id
    this.items = items
    this.price = price
  }
}

/* {
  "@context": "/contexts/OrderMenu",
  "@id": "/order_menus/6",
  "@type": "OrderMenu",
  "id": 6,
  "items": [
    "/order_items/20",
    "/order_items/21"
  ],
  "price": 21,
  "customerOrder": "/customer_orders/6",
  "menu": "/menu_picks/14"
} */
