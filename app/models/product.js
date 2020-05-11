import { idFromUri } from '@/utils'

export class Product {
  get title () { return this.name }
  get value () { return this.internalName }

  constructor ({ id, allergens, name, internalName, family }) {
    this.id = id || 0
    this.allergens = allergens || []
    this.name = name || ''
    this.internalName = internalName || ''
    this.family = idFromUri(family)
  }
}

/* {
  "@id": "/products/1",
  "@type": "Product",
  "productModel": "/product_models/1",
  "store": "/stores/1",
  "id": 1,
  "energy": 0,
  "fat": 48,
  "fatLipid": 20,
  "carbohydrate": 84,
  "carbohydrateSugar": 3,
  "proteins": 83,
  "salt": 10,
  "allergens": [],
  "active": true,
  "name": "Cœur de romaine",
  "internalName": "base-coeur-de-romaine",
  "family": "/families/4"
} */
