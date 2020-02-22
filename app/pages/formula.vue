<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout>
          <app-tile :data="{ type: 'wrap', name: data.title }" :hero="true" />
          <StackLayout class="p-m">
            <app-pick v-for="(pick, index) in picks" :key="index" :data="pick" :items="items" @change="onPickChange" />
          </StackLayout>
        </StackLayout>
      </ScrollView>
      <StackLayout class="p-s" flexShrink="0">
        <Button :class="[valid ? 'validate' : 'disabled']" :text="orderText" :isEnabled="valid" class="formula--btn action big" @tap="order()" />
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

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      valid: false,
      total: 0,
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
    this.picks = this.data.picks
  },
  methods: {
    onPickChange () {
      this.updateTotal()
      this.updateValidity()
    },
    formatPrice: num => Formatter.price(num),
    updateTotal () {
      this.total = this.picks.reduce((sum, val) => (sum += val.price || 0), 0)
      this.total += this.data.price
      this.data.total = this.total
      console.log('total :', this.total)
    },
    updateValidity () {
      this.valid = !this.picks.some(p => !p.valid)
      console.log('formula valid ? ' + this.valid.toString())
    },
    order () {
      console.log('user wants to order')
      this.$navigateTo(Cart, {
        props: { data: this.data },
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
