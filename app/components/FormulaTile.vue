<template>
  <FlexboxLayout class="formula-tile primary-border p10 mb12">
    <StackLayout flexGrow="1" flexShrink="0" class="mr10">
      <Label :text="data.title" class="alt bold fz15vw" />
      <Label :text="formatPrice(data.price)" class="alt fz14vw" />
    </StackLayout>

    <StackLayout flexGrow="2" flexShrink="1" class="pt5 mh10">
      <Label v-for="(line, index) in description" :key="index" :text="line" />
    </StackLayout>

    <StackLayout flexShrink="0">
      <Button :text="$t('common.select')" @tap="select()" />
    </StackLayout>
  </FlexboxLayout>
</template>

<script>
import { mapGetters } from 'vuex'

import Formatter from '@/utils/Formatter'

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    equalize: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
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
    },
  },
  methods: {
    formatPrice: num => Formatter.price(num),
    select () {
      console.log('user selected :', this.data.title)
      this.$emit('tap')
    },
  },
}
</script>
