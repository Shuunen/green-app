
export class Order {
  constructor ({ id = '', menus = [], store = '', creationDate = '' }) {
    this.id = id
    this.menus = menus
    this.store = store
    this.creationDate = creationDate
  }
}

/* sample order :
{
 "id": 18,
 "menus": [],
 "store": "/stores/7",
 "customer": "/users/9",
 "creationDate": "2020-04-01T17:02:45+00:00"
}
*/
