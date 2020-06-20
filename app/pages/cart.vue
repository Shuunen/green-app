<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout>
          <app-tile :data="{ type: 'dessert', name: $t('order.summary') }" :hero="true" />
          <StackLayout class="p-m">
            <StackLayout class="m-l mb-m">
              <StackLayout v-for="(formula, fi) in orders" :key="fi">
                <!-- note formula here is a cloned object, not a formula/menu_model instance -->
                <app-cart-line class="pt-m pb-m fz-m alt" :type="formula.label" :price="readablePrice(formula.price)" />
                <app-cart-line
                  v-for="(pick, pi) in formula.picks"
                  :key="pi"
                  class="pl-m pb-s"
                  :type="pick.titleTextSingular"
                  :selection="pick.selection"
                  :price="readablePrice(pick.price)"
                  :delay="200 + pi * 200"
                />
              </StackLayout>
            </StackLayout>
            <app-cart-line class="p-m fz-m" :type="$t('order.total')" :price="cartTotal()" :delay="cartTotalDelay()" />
            <!--
              <Button
                class="action big validate"
                :text="$t('order.pay', { amount : readablePrice(32.40) })"
                @tap="$navigateTo(Checkout, { props: { sessionId: 'cs_test_pFJYjNrylNOqCcdj06phRLhJFrevdI85VWWmBvYRDVXPvfJhq9AykXwm' } })"
              />
            -->

            <Button class="action big" :text="$t('order.add-formula')" @tap="add()" />
            <Button class="action big validate" :text="$t('order.validate-pay')" @tap="validateOrder()" />
            <FlexboxLayout class="mt-s">
              <Button class="action" flexGrow="1" :text="$t('order.modify-last-selection')" @tap="modify()" />
              <Button class="action" flexGrow="1" :text="$t('order.cancel')" @tap="cancel()" />
            </FlexboxLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { readablePrice, showError } from '@/utils'
import { apiService } from '@/services'
import Formulas from '@/pages/formulas'
import Home from '@/pages/home'
import Checkout from '@/pages/checkout'

export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      readablePrice,
      valid: false,
    }
  },
  created () {
    console.log('Cart page created')
  },
  methods: {
    modify () {
      this.$navigateBack()
    },
    add () {
      console.log('user has', this.orders.length, 'formula(s) in the cart and wants to add another...')
      this.$navigateTo(Formulas, { props: { orders: this.orders } })
    },
    cancel () {
      this.$navigateTo(Home)
    },
    cartTotal () {
      let total = 0
      this.orders.forEach(formula => (total += formula.total))
      console.log('total is', total)
      return readablePrice(total)
    },
    cartTotalDelay () {
      let delay = 200
      this.orders.forEach(formula => (delay += formula.picks.length * 200))
      return delay
    },
    async validateOrder () {
      this.isLoading = true
      const response = await apiService.validateOrder(this.orders)
      this.isLoading = false
      if (!response.ok) return showError('error.order-failed')
      this.$navigateTo(Checkout, { props: { sessionId: response.stripeSessionId } })
    },
  },
}
</script>
