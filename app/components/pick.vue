<template>
  <StackLayout class="pick mt-m p-m" :class="{ valid: data.valid }">
    <Label :text="data.titleText" class="pick--title mb-s" />
    <Label v-if="descText.length" :text="descText" class="pick--desc black ml-s mb-s" />
    <Label v-if="data.extraPrice" :text="data.extraText" class="pick--extra ml-s mb-s" />
    <FlexboxLayout flexWrap="wrap">
      <Button v-for="item in list" :key="item.value" :text="$t(item.title)" :class="{ selected: (selection.findIndex(s => s.value === item.value) > -1) }" @tap="selectItem(item)" />
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
import { readablePrice } from '@/utils'

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
    // console.log('Pick component created, picking in :', this.data.from)
    if (!this.data.from || !this.data.from.length) return console.error('\n data.from empty /!\\ \n')
    this.setTitle()
    this.setDesc()
    this.setExtra()
    this.setList()
  },
  mounted () {
    // console.log('Pick component mounted, picking in :', this.data.from)
    // console.log('selection is :', prettyPrint(this.data.selection))
  },
  methods: {
    setList () {
      this.data.from.forEach(type => {
        if (!this.items[type]) return console.error(`failed to find items of type "${type}"`)
        this.list = this.list.concat(this.items[type])
      })
      if (this.data.selection && this.data.selection.length) this.selection = this.data.selection
    },
    setTitle () {
      let i18nKey = this.data.title || `pick.section-${this.data.from.join('-')}`
      i18nKey = this.reduceCombos(i18nKey)
      this.data.titleText = this.$tc(i18nKey, 2)
      this.data.titleTextSingular = this.$tc(i18nKey, 1)
    },
    setDesc () {
      let i18nKey = `pick.you-can-pick-n-${this.data.from.join('-')}`
      i18nKey = this.reduceCombos(i18nKey)
      this.descText = this.$tc(i18nKey, this.data.amount || 2)
    },
    setExtra () {
      if (!this.data.extraPrice) return
      this.data.extraText = `${readablePrice(this.data.extraPrice)} ${this.$t('pick.for-each-extra')}`
    },
    isValid () {
      return this.selection.length > 0 // at least one item selected
    },
    getPrice () {
      if (!this.data.extraPrice) return 0
      return Math.max(this.selection.length - this.data.amount, 0) * this.data.extraPrice
    },
    reduceCombos (str) {
      return str.replace('soup-wrap', 'wrap-soup').replace('dessert-drink', 'drink-dessert')
    },
    selectItem (item) {
      const index = this.selection.findIndex(s => s.value === item.value)
      if (index > -1) {
        console.log('user de-selected item :', item.value)
        this.selection.splice(index, 1)
      } else {
        console.log('user selected item :', item.value)
        if (this.selection.length === this.data.amount && !this.data.extraPrice) {
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
