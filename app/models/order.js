import { getArray, getString } from '@/utils'

export class Order {
  constructor (data = {}) {
    this.id = getString(data.id)
    this.menus = getArray(data.menus)
    this.store = getString(data.store)
    this.creationDate = getString(data.creationDate)
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
