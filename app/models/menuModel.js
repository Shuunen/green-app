const PICKS_MOCK = [
  {
    pick: 1,
    from: 'bases',
  },
  {
    pick: 3,
    from: 'ingredients',
    extraPrice: 1,
  },
  {
    pick: 1,
    from: 'sauces',
  },
]

export class MenuModel {
  get title () {
    return this.label
  }

  constructor ({ id, label, price, icon, picks }) {
    this.id = id || 0// FIXME: id is missing https://github.com/Shuunen/green-app/issues/204
    this.label = label || ''
    this.price = price || 0
    this.picks = PICKS_MOCK || picks || [] // FIXME: remove PICKS_MOCK https://github.com/Shuunen/green-app/issues/213
    this.icon = icon || 'formulas' // FIXME: icon is missing https://github.com/Shuunen/green-app/issues/204
  }
}

/* {
  "@id": "/menu_models/1",
  "@type": "MenuModel",
  "families": [],
  "label": "Green Rush",
  "price": 9.4,
  "active": true,
  "picks": [
      {
          "@id": "/menu_picks/3",
          "@type": "MenuPick",
          "amount": 1,
          "extraPrice": null
      },
      {
          "@id": "/menu_picks/2",
          "@type": "MenuPick",
          "amount": 3,
          "extraPrice": null
      },
      {
          "@id": "/menu_picks/1",
          "@type": "MenuPick",
          "amount": 1,
          "extraPrice": null
      }
  ]
} */
