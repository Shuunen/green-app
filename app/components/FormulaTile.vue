<template>
  <FlexboxLayout class="formula-tile p10 mb10">
    <StackLayout flexGrow="1" flexShrink="0" class="mr10">
      <Label
        class="primary-alt bold fz20"
        :text="data.title"
      />
      <Label
        class="primary-alt fz20"
        :text="formatPrice(data.price)"
      />
    </StackLayout>

    <StackLayout flexGrow="2" class="pt5">
      <Label
        v-for="(line, index) in description"
        :key="index"
        :text="line"
      />
    </StackLayout>

    <StackLayout>
      <Button
        text="Select"
        @tap="select()"
      />
    </StackLayout>
  </FlexboxLayout>
</template>

<script>
import Formatter from '@/utils/Formatter'
import { mapGetters } from 'vuex'

export default {
  name: 'FormulaTile',
  props: {
    data: {
      type: Object,
      required: true
    },
    equalize: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
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
      if (this.equalize) {
        while (lines.length < 3) {
          lines.push(' ')
        }
      }
      return lines
    }
  },
  methods: {
    formatPrice: (num) => Formatter.price(num),
    select () {
      console.log('user selected :', this.data.title)
      this.$emit('tap')
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles";

.formula-tile {
  border-color: $color-primary-alt;
  border-width: 1;
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
