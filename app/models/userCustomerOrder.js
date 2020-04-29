// this is a customer order from /me
import { UserOrderMenu } from '@/models'

export class UserCustomerOrder {
  constructor ({ id, menus, store, storeName, creationDate, price, totalFat, totalCarbohydrate, totalProteins, totalSalt }) {
    this.id = id || 0
    this.menus = (menus || []).map(m => new UserOrderMenu(m))
    this.storeName = storeName || (store || {}).name || ''
    this.creationDate = creationDate || ''
    this.totalFat = totalFat || 0
    // this.totalFatLipid =  totalFatLipid
    this.totalCarbohydrate = totalCarbohydrate || 0
    // this.totalCarbohydrateSugar =  totalCarbohydrateSugar
    this.totalProteins = totalProteins || 0
    this.totalSalt = totalSalt || 0
    this.price = price || this.menus.reduce((a, b) => (a += b.price), 0) || 0
    // console.log('a user customer order has been created', prettyPrint(this))
  }
}

/* {
  "id": 6,
  "menus": [...],
  "store": {
    "id": 1,
    "name": "Default store",
    ...
  },
  "customer": "/users/9",
  "creationDate": "2020-04-04T10:11:12+00:00",
  "totalFat": 121,
  "totalFatLipid": 115,
  "totalCarbohydrate": 26,
  "totalCarbohydrateSugar": 175,
  "totalProteins": 92,
  "totalSalt": 180
}, */
