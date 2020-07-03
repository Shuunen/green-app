
export class MenuPick {
  constructor ({ id, amount, extraPrice, families }) {
    this.id = id || 0
    this.amount = amount || 0
    this.extraPrice = extraPrice || 0
    this.families = families || []
  }
}

/* {
  "id": 90,
  "amount": 1,
  "families": [
      "base"
  ],
  "menuModel": "/menu_models/29",
  "extraPrice": 1,
  "orderDisplay": 0
} */
