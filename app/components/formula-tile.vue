<template>
  <FlexboxLayout class="primary-border p-m mb-m">
    <StackLayout flexGrow="2" flexShrink="1" class="mr-m ml-s">
      <Label :text="data.title" class="alt bold fz-l" />
      <Label v-for="(line, index) in description" :key="index" :text="line" class="fz-l mt-m black" />
      <Label :text="readablePrice(data.price)" class="alt fz-m mt-m" />
    </StackLayout>
  </FlexboxLayout>
</template>

<script>
import { readablePrice } from '@/utils'

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
  data () {
    return {
      readablePrice,
    }
  },
  computed: {
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
    select () {
      console.log('user selected :', this.data.title)
      this.$emit('tap')
    },
  },
}
</script>
