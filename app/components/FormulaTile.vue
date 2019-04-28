<template>
  <FlexboxLayout class="formula-tile p10 mb12">
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

    <StackLayout flexShrink="0">
      <Button
        :text="$t('common.select')"
        @tap="select()"
      />
    </StackLayout>
  </FlexboxLayout>
</template>

<script>
import Formatter from '@/utils/Formatter'
import { mapGetters } from 'vuex'

export default {
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
        const from = this.$tc('pick.' + pick.from, nb)
        const or = this.$tc('pick.' + pick.or, nb)
        if (pick.from === 'bases') {
          lines[0] += from
        } else if (pick.from === 'ingredients') {
          lines[0] += ` + ${nb} ${from}`
        } else if (pick.from && pick.or) {
          lines.push(`+ ${from} ${this.$t('common.or')} ${or}`)
        } else if (['drinks', 'deserts'].indexOf(pick.from) > -1) {
          lines.push(`+ ${from}`)
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
</style>
