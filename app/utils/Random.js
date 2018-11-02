// specific
const data = {
  id: 1,
  types: ['starter', 'main', 'dessert'],
  names: ['Salad salty', 'Spicy chicken', 'Pooled Fry', 'Jujuba Coconut', 'Embas', 'Cascady fills', 'Fluffs', 'Koppa Cabana']
}

export default class Random {
  // generic
  static getString () {
    return (
      data.names.pop() ||
      Math.random()
        .toString(36)
        .substring(7)
    )
  }
  static getNumber (min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  static pickOne (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
  // specific
  static getPriceCents () {
    return this.pickOne([0, 0.5, 0.45, 0.99, 0.75, 0.80])
  }
  static getPrice () {
    return this.getNumber(2, 9) + this.getPriceCents()
  }
  static getProduct () {
    return {
      id: data.id++,
      name: this.getString(),
      price: this.getPrice(),
      type: this.pickOne(data.types)
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
