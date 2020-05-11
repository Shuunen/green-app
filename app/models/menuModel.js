import { MenuPick } from './menuPick'

export class MenuModel {
  get title () { return this.label }

  constructor ({ id, label, price, icon, picks, active }) {
    this.id = id || 0
    this.label = label || ''
    this.price = price || 0
    this.picks = (picks || []).map(p => new MenuPick(p))
    this.icon = icon || 'formulas'
    this.active = active || false
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
    },
    ...
  ]
} */
