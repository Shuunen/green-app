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
            v-for="(pick, index) in picks"
            :key="index"
            :data="pick"
            :items="items"
            @change="onPickChange"
          />
        </StackLayout>
      </ScrollView>
      <Button
        class="formula--btn"
        flexShrink="0"
        :class="{ valid }"
        :text="orderText"
        :isEnabled="valid"
        @tap="order()"
      />
    </FlexboxLayout>
  </Page>
</template>

<script>
import Tile from '@/components/Tile'
import Pick from '@/components/Pick'
import Formatter from '@/utils/Formatter'
import { mapGetters, mapActions } from 'vuex'

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
    return {
      valid: false,
      total: 0,
      picks: []
    }
  },
  computed: {
    ...mapGetters({
      items: 'items',
      isLoading: 'isLoading'
    }),
    orderText: function () {
      if (this.valid) {
        return `Order this formula for ${this.formatPrice(this.total)}`
      }
      return 'Complete selection to order'
    }
  },
  created () {
    console.log('Formula page created')
    this.load()
  },
  methods: {
    ...mapActions(['loadItems']),
    load () {
      this.loadItems()
        .catch(error => {
          console.error(error)
          alert('An error occurred loading item list.')
        })
        .then(() => (this.picks = this.data.picks))
    },
    onPickChange () {
      this.updateTotal()
      this.updateValidity()
    },
    formatPrice (num) {
      return Formatter.price(num, this.locale, this.currency)
    },
    updateTotal () {
      this.total = this.picks.reduce((sum, val) => (sum += (val.price || 0)), 0)
      this.total += this.data.price
      console.log('total :', this.total)
    },
    updateValidity () {
      this.valid = !this.picks.some(p => !p.valid)
      console.log('formula valid ? ' + this.valid.toString())
    },
    order () {
      console.log('user wants to order selection')
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles";

.formula--btn {
  &.valid {
    opacity: 1;
    color: $color-primary-alt;
    background-color: $color-primary;
  }
}
</style>
