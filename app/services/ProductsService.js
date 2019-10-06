import * as http from 'tns-core-modules/http'
import ApiService from '@/services/ApiService'
import * as Mocks from '@/utils/Mocks'

const doMock = false

export default class ProductsService extends ApiService {
  loadFormulas () {
    return this.loadFormulasWithFamilies.then(formulaData => {
      var formula = formulaData.formula
      formula.picks = []

      return formulaData.picksPromises.then(picks => {
        return picks.map(pickPromise => {
          let pick = pickPromise.then(this.validateCode).then(this.getJson)

          formula.picks.push({
            pick: pick.label,
            from: pick.id,
            products: pick.products,
          })

          return formula
        })
      })
    })
  }

  loadProductsOfPick (pick) {
    var productsPromises = []
    for (var productIndex in pick.products) {
      let productUrl = this.baseUrl + pick.products[productIndex]
      productsPromises.push(http.request({ productUrl, method: 'GET', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }))
    }

    return Promise.all(productsPromises)
  }

  loadPicksDataForFormula (formula) {
    return formula.picks.map(pick => {
      var pickData = pick
      pickData.products = this.loadProductsOfPick(pick)
      return pickData
    })
  }

  loadFormulasWithFamilies () {
    let source = null
    if (doMock) {
      const list = Mocks.formulas
      console.info(`Returning ${list.length} mocked formulas`)
      source = Promise.resolve(list)
    } else {
      const url = this.baseUrl + '/menu_models'
      source = http.request({ url, method: 'GET', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(this.validateCode).then(this.getJson)
    }
    return source.then(data => {
      return data.map(menuModel => {
        var familiesPromises = []
        for (var formulaPick in menuModel.families) {
          const url = this.baseUrl + menuModel.families[formulaPick]
          console.log('using url :', url)
          familiesPromises.push(http.request({ url, method: 'GET', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }))
        }

        return {
          formula: {
            title: menuModel.label,
            price: menuModel.price,
            store: menuModel.store,
          },
          picksPromises: Promise.all(familiesPromises),
        }
      })
    })
  }

  loadItems (formula) {
    let source = null
    if (doMock) {
      const list = Mocks.items
      console.info(`Returning ${list.length} mocked items`)
      source = Promise.resolve(list)
    } else {
      source = this.loadPicksDataForFormula(formula).map(pick => {
        pick.products = pick.products.map(productPromise => {
          return productPromise.then(this.validateCode).then(this.getJson)
        })

        return pick
      })
    }
    return source
  }

  getHeaders (toAppend = {}) {
    return Object.assign({
      'Content-Type': 'application/json',
      'Authorization': 'Green ' + this.token,
    },
    toAppend)
  }
}
