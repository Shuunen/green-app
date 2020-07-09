import { MenuPick } from './menuPick'

export class MenuModel {
  get title () { return this.label }

  constructor ({ id, label, price, icon, picks, active, shortDescription }) {
    this.id = id || 0
    this.label = label || ''
    this.price = price || 0
    this.picks = (picks || []).map(p => new MenuPick(p))
    this.icon = icon || 'formulas'
    this.active = active || false
    this.shortDescription = shortDescription || ""
  }
}

/* {
  "id": 29,
  "label": "green-adipisicing",
  "price": 18.88,
  "active": true,
  "picks": [ { ... }, ...],
  "icon": "formulas"
} */
