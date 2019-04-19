<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout class="p10">
          <Tile
            :data="{
              type: 'formula',
              name: 'Order'
            }"
            :hero="true"
            class="h60"
          />
          <CartLine class="pt10 pb10 fz20" :desc="'Formula ' + data.title" :price="formatPrice(data.price)" />
          <CartLine
            v-for="(pick, index) in data.picks"
            :key="index"
            class="pl15 pb5"
            :desc="pick.titleText"
            :price="formatPrice(pick.price)"
          />
        </StackLayout>
      </ScrollView>
      <FlexboxLayout>
        <Button class="cart--btn modify" text="Modify" />
        <Button class="cart--btn validate" flexGrow="1" text="Validate" />
        <Button class="cart--btn cancel" text="Cancel" />
      </FlexboxLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import CartLine from '@/components/CartLine'
import Tile from '@/components/Tile'
import { mapGetters, mapActions } from 'vuex'
import Formatter from '@/utils/Formatter'

export default {
  components: {
    CartLine,
    Tile
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      valid: false
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading'
    })
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
    formatPrice (num) {
      console.log('typeof num ? ' + typeof num)
      console.log('format to locale : ' + this.locale)
      console.log('format with currency : ' + this.currency)
      return Formatter.price(num, this.locale, this.currency)
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles";

.cart--btn {
  &.validate {
    color: $color-white;
    background-color: $color-primary;
  }
}
</style>
