
export class Store {
  constructor ({ id = '', menus = [], name = '', address = '', phone = '' }) {
    this.id = id
    this.menus = menus
    this.name = name
    this.address = address
    this.phone = phone
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
