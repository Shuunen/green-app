
export class Product {
  get title () { return this.name }
  get value () { return this.internalName }

  constructor ({ id, allergens, name, internalName, family, salePrice, price }) {
    this.id = id || 0
    this.allergens = allergens || []
    this.name = name || ''
    this.internalName = internalName || ''
    this.family = family || 0
    this.price = salePrice || price || 0
  }
}

/* {
    "id": 495,
    "name": "Sauce Provençale",
    "salePrice": 2,
    "internalName": "Sauce Provençale",
    "family": 33,
    "allergens": []
} */
