<template>
  <FlexboxLayout
    class="formula-tile p5 mr10 mb10"
    alignItems="center"
    flexDirection="column"
  >
    <Icon
      v-if="data.icon"
      :name="data.icon"
      size="100"
    />
    <Label
      class="title mb10 fz20"
      :text="data.title"
    />
    <Label
      v-for="line in description"
      :key="line"
      class="description text mb10"
      :text="line"
    />
    <Button
      text="Select"
      @tap="select()"
    />
  </FlexboxLayout>
</template>

<script>
import Icon from '@/components/Icon'
import Formatter from '@/utils/Formatter'
import { mapGetters } from 'vuex'

export default {
  name: 'FormulaTile',
  components: {
    Icon
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      currency: 'currency',
      locale: 'locale',
      isLoading: 'isLoading'
    }),
    description: function () {
      const lines = ['']
      this.data.picks.forEach(pick => {
        const nb = pick.pick
        if (pick.from === 'bases') {
          lines[0] += Formatter.singular(pick.from)
        } else if (pick.from === 'ingredients') {
          lines[0] += ` + ${nb} ${pick.from}`
        } else if (pick.from && pick.or) {
          lines.push(`+ ${Formatter.singular(pick.from)} or ${Formatter.singular(pick.or)}`)
        } else if (['drinks', 'deserts'].indexOf(pick.from) > -1) {
          lines.push(`+ ${Formatter.singular(pick.from)}`)
        }
      })
      return lines
    }
  },
  methods: {
    formatPrice (num) {
      return Formatter.price(num, this.locale, this.currency)
    },
    select () {
      console.log('user selected :', this.data.title)
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles";

.formula-tile {
  border-color: $color-primary;
  border-width: 2;
  .title {
    font-weight: bold;
  }
}
/* Debug
.product {
  &-icon {
    background-color: orange;
  }
  &-name {
    background-color: green;
  }
  &-price {
    background-color: purple;
  }
  &-add {
    background-color: palevioletred;
  }
}
*/
</style>
