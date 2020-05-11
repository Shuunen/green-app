import { idFromUri } from '@/utils'

export class MenuPick {
  constructor (data) {
    this.id = data.id || idFromUri(data['@id'])
    this.amount = data.amount || 0
    this.extraPrice = data.extraPrice || 0
    this.families = (data.families || []).map(family => (typeof family === 'string' ? family : family.label))
  }
}

/*
in : {
  "@id": "/menu_picks/21",
  "@type": "MenuPick",
  "amount": 1,
  "families": [
      {
          "@id": "/families/7",
          "@type": "Family",
          "label": "dessert"
      }
  ],
  "extraPrice": null
}

out : {
  "id": 21,
  "amount": 1,
  "families": ["dessert"],
  "extraPrice": 0
}
*/
