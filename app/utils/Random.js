import { pickOne, getRandomNumber, getRandomString } from 'shuutils'

const data = {
  id: 1,
  types: ['starter', 'main', 'dessert']
}

export default class Random {
  // specific
  static getPriceCents () {
    return pickOne([0, 0.5, 0.45, 0.99, 0.75, 0.80])
  }
  static getPrice () {
    return getRandomNumber(2, 9) + this.getPriceCents()
  }
  static getProduct () {
    return {
      id: data.id++,
      name: getRandomString(),
      price: this.getPrice(),
      type: pickOne(data.types)
    }
  }
  static getProducts () {
    const collection = []
    for (let i = 0; i < 10; i++) {
      collection.push(this.getProduct())
    }
    return collection
  }
}
