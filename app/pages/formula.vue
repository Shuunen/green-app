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
        <Button :class="[valid ? 'validate' : 'disabled']" :text="valid ? $t('order.add-cart') : $t('order.complete-selection')" :isEnabled="valid" class="formula--btn action big" @tap="add()" />
        <FlexboxLayout>
          <Button :text="$t('order.change-formula')" class="action" flexGrow="1" @tap="modify()" />
          <Button :text="$t('order.cancel')" class="action" flexGrow="1" @tap="cancel()" />
        </FlexboxLayout>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { apiService } from '@/services'
import { clone } from 'shuutils'
import Cart from '@/pages/cart'
import Home from '@/pages/home'

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
