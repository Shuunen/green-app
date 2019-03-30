<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout class="p10">
          <Tile
            :data="{
              type: 'formula',
              name: data.title
            }"
            :hero="true"
            class="h60"
          />
          <Pick
            v-for="(pick, index) in data.picks"
            :key="index"
            :data="pick"
          />
        </StackLayout>
      </ScrollView>
      <Button
        class="formula--btn"
        :class="{ enabled: total > 0 }"
        :text="orderText"
        @tap="select()"
      />
    </FlexboxLayout>
  </Page>
</template>

<script>
import Tile from '@/components/Tile'
import Pick from '@/components/Pick'
import Formatter from '@/utils/Formatter'
import { mapGetters } from 'vuex'

export default {
  components: {
    Tile,
    Pick
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading'
    }),
    total: function () {
      return 0
    },
    orderText: function () {
      if (this.total) {
        return `Order this formula for ${this.formatPrice(this.total)}`
      }
      return 'Complete selection to order'
    }
  },
  created () {
    console.log('Formula page created')
  },
  methods: {
    formatPrice (num) {
      return Formatter.price(num, this.locale, this.currency)
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles";

.formula--btn {
  opacity: 0.5;
}
</style>
