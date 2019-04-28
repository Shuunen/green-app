<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout class="p10">
          <Tile
            :data="{
              type: 'formula',
              name: $t('order.summary')
            }"
            :hero="true"
          />

          <StackLayout class="m30">
            <CartLine class="pt10 pb10 fz20 primary-alt" :type="data.title + ' formula'" :price="formatPrice(data.price)" />
            <CartLine
              v-for="(pick, index) in data.picks"
              :key="index"
              class="pl10 pb5"
              :type="pick.titleTextSingular"
              :selection="pick.selection"
              :price="formatPrice(pick.price)"
              :delay="200 + index * 200"
            />
            <CartLine class="pl10 pt10 pb10 fz20" :type="'TOTAL'" :price="formatPrice(data.total)" :delay="200 + data.picks.length * 200" />
          </StackLayout>

          <Button class="action big validate mt10" text="Validate & Pay" />
          <FlexboxLayout class="mt5">
            <Button class="action" flexGrow="1" text="Modify selection" @tap="modify()" />
            <Button class="action" flexGrow="1" text="Cancel order" @tap="cancel()" />
          </FlexboxLayout>
        </StackLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import CartLine from '@/components/CartLine'
import Tile from '@/components/Tile'
import Home from '@/pages/Home'
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
    formatPrice: (num) => Formatter.price(num),
    modify () {
      this.$navigateBack()
    },
    cancel () {
      this.$navigateTo(Home, {
        frame: 'mainContent'
      })
    }
  }
}
</script>
