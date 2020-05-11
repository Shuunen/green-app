
export class Family {
  get name () { return this.label }

  constructor ({ id, label }) {
    this.id = id || 0
    this.label = label || ''
  }
}

/* {
  "@id": "/families/1",
  "@type": "Family",
  "id": 1,
  "products": [],
  "label": "base",
  "menuPicks": [...]
} */
