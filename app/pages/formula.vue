<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout>
          <app-tile :data="{ type: 'wrap', name: order.title }" :hero="true" />
          <StackLayout class="p-m">
            <app-pick v-for="(pick, index) in picks" :key="index" :data="pick" :items="items" @change="onPickChange" />
          </StackLayout>
        </StackLayout>
      </ScrollView>
      <StackLayout class="p-s" flexShrink="0">
        <Button :class="[valid ? 'validate' : 'disabled']" :text="orderText" :isEnabled="valid" class="formula--btn action big" @tap="add()" />
        <FlexboxLayout>
          <Button :text="$t('order.change-formula')" class="action" flexGrow="1" @tap="modify()" />
          <Button :text="$t('order.cancel')" class="action" flexGrow="1" @tap="cancel()" />
        </FlexboxLayout>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Cart from '@/pages/cart'
import Formatter from '@/utils/formatter'
import Home from '@/pages/home'
import { apiService } from '@/services/api-service'
import { clone } from '@/utils'

export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      valid: false,
      total: 0,
      order: {},
      picks: [],
      items: apiService.items,
    }
  },
  computed: {
    orderText: function () {
      if (this.valid) {
        const total = this.formatPrice(this.total)
        return this.$t('order.formula-for') + ' ' + total
      }
      return this.$t('order.complete-selection')
    },
  },
  created () {
    console.log('Formula page created')
    this.order = clone(this.data)
    this.picks = this.order.picks
  },
  methods: {
    onPickChange () {
      this.updateTotal()
      this.updateValidity()
    },
    formatPrice: num => Formatter.price(num),
    updateTotal () {
      this.total = this.picks.reduce((sum, val) => (sum += val.price || 0), 0)
      this.total += this.order.price
      this.order.total = this.total
      console.log('total :', this.total)
    },
    updateValidity () {
      this.valid = !this.picks.some(p => !p.valid)
      console.log('formula valid ? ' + this.valid.toString())
    },
    add () {
      console.log('user wants to add this order')
      this.$navigateTo(Cart, {
        props: { orders: [...this.orders, this.order] },
      })
    },
    modify () {
      this.$navigateBack()
    },
    cancel () {
      this.$navigateTo(Home)
    },
  },
}
</script>
