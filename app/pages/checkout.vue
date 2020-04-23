<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout>
          <app-header :user="user" />
          <app-tile :data="{ type: 'dessert', name: 'Checkout' }" :hero="true" />
          <StackLayout class="p-m center">
            <CreditCardView ref="ccView" class="mt-l" />
            <FlexboxLayout flexDirection="column" alignItems="center" class="mt-l">
              <Button class="action big validate" :text="$t('order.pay', { amount : readablePrice(32.40) })" @tap="pay()" />
            </FlexboxLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { readablePrice, prettyPrint } from '@/utils'
import { apiService } from '@/services'
import { Stripe, Card } from 'nativescript-stripe'

const stripe = new Stripe('pk_test_icN9h1tmcNGKumwhkiinNuG100CEFYGWvX')
const fakeVisa = {
  number: '4716898794354567',
  month: '01',
  year: '2021',
  cvc: '055',
}

export default {
  data () {
    return {
      readablePrice,
      isLoading: false,
      user: apiService.user,
    }
  },
  created () {
    console.log('Checkout page created')
  },
  methods: {
    async pay () {
      // https://www.nsplugins.com/plugin/nativescript-stripe
      // https://blog.angelengineering.com/shopping-app/
      // https://github.com/triniwiz/nativescript-stripe/pull/84/files
      // const ccView = this.$refs.ccView.nativeView
      //  console.log('keys from this.$refs.ccView.android :', prettyPrint(this.$refs.ccView.nativeView.card))
      // console.log('this.$refs.ccView', prettyPrint(this.$refs.ccView.card))
      /*
      const nativeView = this.$refs.ccView.nativeView
      const card = nativeView.android.getCard()
      if (!card.validateCard()) return console.error('card is invalid')
      console.log('card.constructor', prettyPrint(card.constructor))
      */
      // const stripeCard = new Card(card.getNumber().toString(), Number(card.getExpMonth()), Number(card.getExpYear()), card.getCVC().toString())
      const data = {}
      data.card = this.getCard(fakeVisa)
      data.paymentMethod = await this.getPaymentMethod(data.card)
      data.paymentToken = await this.getPaymentToken(data.card)
      console.log('here is all the data I have for now :', prettyPrint(data))
    },

    getCard ({ number, month, year, cvc }) {
      return new Card(number, parseInt(month), parseInt(year), cvc)
    },

    async getPaymentToken (card) {
      return new Promise(resolve => {
        const onPaymentToken = (err, token) => {
          if (err) {
            console.error('payment token failed', err)
            alert('payment token failed')
            return resolve(null)
          }
          console.log('payment token has been generated :', token)
          alert('payment token has been generated !')
          resolve(token)
        }
        stripe.createToken(card, onPaymentToken)
      })
    },

    async getPaymentMethod (card) {
      return new Promise(resolve => {
        const onPaymentMethod = (err, pm) => {
          if (err) {
            console.error('payment method failed', err)
            alert('payment method failed')
            return resolve(null)
          }
          console.log('payment method has been generated with id :', pm.id)
          alert('payment method has been generated !')

          resolve(pm)
        }
        stripe.createPaymentMethod(card, onPaymentMethod)
      })
    },
  },
}
</script>
