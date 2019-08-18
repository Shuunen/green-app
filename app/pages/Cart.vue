<template>
  <Page>
    <Header />
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout>
          <Tile :data="{ type: 'dessert', name: $t('order.summary') }" :hero="true" />
          <StackLayout class="p10">
            <StackLayout class="m30">
              <CartLine class="pt10 pb10 fz20 alt" :type="data.title" :price="formatPrice(data.price)" />
              <CartLine
                v-for="(pick, index) in data.picks"
                :key="index"
                class="pl10 pb5"
                :type="pick.titleTextSingular"
                :selection="pick.selection"
                :price="formatPrice(pick.price)"
                :delay="200 + index * 200"
              />
              <CartLine class="pl10 pt10 pb10 fz20" :type="$t('order.total')" :price="formatPrice(data.total)" :delay="200 + data.picks.length * 200" />
            </StackLayout>

            <Button class="action big validate mt10" :text="$t('order.validate-pay')" />
            <FlexboxLayout class="mt5">
              <Button class="action" flexGrow="1" :text="$t('order.modify-selection')" @tap="modify()" />
              <Button class="action" flexGrow="1" :text="$t('order.cancel')" @tap="cancel()" />
            </FlexboxLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Header from '@/components/Header'
import CartLine from '@/components/CartLine'
import Formatter from '@/utils/Formatter'
import Home from '@/pages/Home'
import Tile from '@/components/Tile'

export default {
  components: {
    Header,
    CartLine,
    Tile,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      valid: false,
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
    }),
  },
  created () {
    console.log('Cart page created')
    this.load()
  },
  methods: {
    ...mapActions(['loadItems']),
    load () {
      this.loadItems()
        .catch(error => console.error(error))
        .then(() => console.log('sample items loaded'))
    },
    formatPrice: (num) => Formatter.price(num),
    modify () {
      this.$navigateBack()
    },
    cancel () {
      this.$navigateTo(Home, {
        frame: 'mainContent',
      })
    },
  },
}
</script>
