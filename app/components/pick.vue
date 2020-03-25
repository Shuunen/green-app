<template>
  <StackLayout class="pick mt-m p-m" :class="{ valid: data.valid }">
    <Label :text="data.titleText" class="pick--title mb-s" />
    <Label v-if="descText.length" :text="descText" class="pick--desc ml-s mb-s" />
    <Label v-if="data.extraPrice" :text="data.extraText" class="pick--extra ml-s mb-s" />
    <FlexboxLayout flexWrap="wrap">
      <Button v-for="item in list" :key="item.value" :text="$t(item.title)" :class="{ selected: (selection.findIndex(s => s.value === item.value) > -1) }" @tap="selectItem(item)" />
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
import Formatter from '@/utils/formatter'

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    items: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      descText: '',
      list: [],
      selection: [],
    }
  },
  created () {
    console.log('Pick component created')
    // console.log('need to fetch list of :' + this.data.from)
    this.setTitle()
    this.setDesc()
    this.setExtra()
    this.setList()
  },
  methods: {
    formatPrice: (num) => Formatter.price(num),
    setList () {
      const type = this.data.from
      // eslint-disable-next-line no-prototype-builtins
      if (this.items.hasOwnProperty(type)) {
        this.list = this.items[type]
        const typeBonus = this.data.or
        // eslint-disable-next-line no-prototype-builtins
        if (this.items.hasOwnProperty(typeBonus)) {
          this.list = this.list.concat(this.items[typeBonus])
        }
        if (this.data.selection && this.data.selection.length) {
          this.selection = this.data.selection
        }
      } else {
        console.error(`failed to find items of type "${type}"`)
        console.error(`in items[${type}]`, this.items[type])
      }
    },
    setTitle () {
      let i18nKey = ''
      if (this.data.title) {
        i18nKey = this.data.title
      } else {
        const pick = this.data
        i18nKey = `pick.section-${pick.from}`
        if (pick.or) {
          i18nKey += `-or-${pick.or}`
        }
        i18nKey = i18nKey.replace('soups-or-wraps', 'wraps-or-soups')
      }
      this.data.titleText = this.$tc(i18nKey, 2)
      this.data.titleTextSingular = this.$tc(i18nKey, 1)
    },
    setDesc () {
      const pick = this.data
      const nb = pick.pick || (pick.any ? 2 : null)
      if (!pick.from || (!nb && !pick.any)) {
        return
      }
      let i18nKey = `pick.you-can-pick-n-${pick.from}`
      if (pick.extraPrice || pick.any) {
        i18nKey += '-or-more'
      } else if (pick.or) {
        i18nKey += `-or-n-${pick.or}`
      }
      i18nKey = i18nKey.replace('n-soups-or-n-wraps', 'n-wraps-or-n-soups')
      this.descText = this.$tc(i18nKey, nb)
    },
    setExtra () {
      if (!this.data.extraPrice) {
        return
      }
      let str = this.formatPrice(this.data.extraPrice)
      str += ' ' + this.$t('pick.for-each-extra')
      this.data.extraText = str
    },
    isValid () {
      const atLeastOneItem = this.selection.length > 0
      return atLeastOneItem
    },
    getPrice () {
      if (!this.data.extraPrice) {
        return 0
      }
      return Math.max(this.selection.length - this.data.pick, 0) * this.data.extraPrice
    },
    capitalizeFirstLetter: str => Formatter.capitalizeFirstLetter(str),
    selectItem (item) {
      const index = this.selection.findIndex(s => s.value === item.value)
      if (index > -1) {
        console.log('user de-selected item :', item.value)
        this.selection.splice(index, 1)
      } else {
        console.log('user selected item :', item.value)
        if (this.selection.length === this.data.pick && !this.data.extraPrice) {
          const excess = this.selection.shift()
          console.log(`removed excess item : ${excess.value}`)
        }
        this.selection.push(item)
      }
      this.data.valid = this.isValid()
      this.data.price = this.getPrice()
      this.data.selection = this.selection
      this.$emit('change')
    },
  },
}
</script>

<style>
.pick {
  border-width: 1;
  border-color: var(--color-disabled);
}

.pick.valid {
  border-color: var(--color-alt);
}

.pick--title {
  color: var(--color-alt);
  font-size: 20;
}

.pick--extra {
  font-size: 12;
}

.pick .selected {
  background-color: var(--color-alt);
}
</style>