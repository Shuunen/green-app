// this is a customer order from /me
import { UserOrderMenu } from '@/models'

export class UserCustomerOrder {
  constructor ({
    id = 0, menus = [], store = {}, storeName = '', creationDate = '', price = 0,
    totalFat = 0, totalCarbohydrate = 0, totalProteins = 0, totalSalt = 0,
  }) {
    this.id = id
    this.menus = menus.map(m => new UserOrderMenu(m))
    this.storeName = storeName || store.name
    this.creationDate = creationDate
    this.totalFat = totalFat
    // this.totalFatLipid =  totalFatLipid
    this.totalCarbohydrate = totalCarbohydrate
    // this.totalCarbohydrateSugar =  totalCarbohydrateSugar
    this.totalProteins = totalProteins
    this.totalSalt = totalSalt
    this.price = price || this.menus.reduce((a, b) => (a += b.price), 0)
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
