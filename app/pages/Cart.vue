<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout>
          <Tile :data="{ type: 'dessert', name: $t('order.summary') }" :hero="true" />
          <StackLayout class="p-m">
            <StackLayout class="m-l">
              <CartLine class="pt-m pb-m fz-m alt" :type="data.title" :price="formatPrice(data.price)" />
              <CartLine
                v-for="(pick, index) in data.picks"
                :key="index"
                class="pl-m pb-s"
                :type="pick.titleTextSingular"
                :selection="pick.selection"
                :price="formatPrice(pick.price)"
                :delay="200 + index * 200"
              />
              <CartLine class="pl-m pt-m pb-m fz-m" :type="$t('order.total')" :price="formatPrice(data.total)" :delay="200 + data.picks.length * 200" />
            </StackLayout>

            <Button class="action big validate mt-m" :text="$t('order.validate-pay')" />
            <FlexboxLayout class="mt-s">
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
import { mapGetters } from 'vuex'

import CartLine from '@/components/CartLine'
import Formatter from '@/utils/Formatter'
import Home from '@/pages/Home'
import Tile from '@/components/Tile'

export default {
  components: {
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
    ...mapGetters({ isLoading: 'isLoading' }),
  },
  created () {
    console.log('Cart page created')
  },
  methods: {
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
