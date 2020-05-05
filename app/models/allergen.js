
export class Allergen {
  get title () { return this.name }
  get value () { return this.id }

  constructor ({ id, name, internalName }) {
    this.id = id || 0
    this.name = name || ''
    this.internalName = internalName || ''
  }
}

/* {
  "@id": "/allergens/1",
  "@type": "Allergen",
  "id": 1,
  "name": "Céréales contenant du gluten",
  "productModels": [],
  "internalName": "cereales-contenant-du-gluten"
} */
