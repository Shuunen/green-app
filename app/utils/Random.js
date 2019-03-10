import Formatter from '@/utils/Formatter'
import { pickOne, getRandomNumber, getRandomString, copy } from 'shuutils'

const data = {
  id: 1,
  words: {
    starter: ['homemade', '', 'fresh', '', 'premium', '', 'large', '', 'small', 'spicy'],
    joiner: ['with', '', 'of', '', 'mix', '', 'mixed with', '', 'made of', '', 'à la']
  },
  types: [
    {
      type: 'formula',
      name: 'Formulas'
    },
    {
      type: 'smoothie',
      name: 'Smoothies'
    },
    {
      type: 'dessert',
      name: 'Desserts'
    },
    {
      type: 'soup',
      name: 'Soups'
    },
    {
      type: 'wrap',
      name: 'Wraps'
    }
  ]
}

export default class Random {
  static getPriceCents () {
    return pickOne([0, 0.5, 0.45, 0.99, 0.75, 0.80])
  }
  static getPrice () {
    return getRandomNumber(2, 9) + this.getPriceCents()
  }
  static getProductName (type) {
    return `${pickOne(data.words.starter)} ${type} ${pickOne(data.words.joiner)} ${getRandomString()}`.replace(/\s+/g, ' ').trim()
  }
  static getProduct (ofType) {
    const type = ofType || pickOne(data.types).type
    return {
      id: data.id++,
      name: Formatter.capitalizeFirstLetter(this.getProductName(type)),
      price: this.getPrice(),
      type
    }
  }
  static getProducts (ofType) {
    const collection = []
    for (let i = 0; i < 20; i++) {
      collection.push(this.getProduct(ofType))
    }
    return collection
  }
  static getTypes () {
    return copy(data.types)
  }
}
