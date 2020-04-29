
export class OrderMenu {
  constructor ({ id, items, price }) {
    this.id = id || 0
    this.items = items || []
    this.price = price || 0
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
