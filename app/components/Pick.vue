<template>
  <StackLayout class="pick mt10 p10" :class="{ valid: data.valid }">
    <Label :text="titleText" class="pick--title" />
    <Label :text="descText" class="pick--desc ml2 mt5 mb5" />
    <Label v-if="data.extraPrice" :text="extraText" class="pick--extra ml2 mb5" />
    <FlexboxLayout flexWrap="wrap">
      <Button
        v-for="item in list"
        :key="item.value"
        class="pick--button"
        :text="item.title"
        :class="{ selected: (selection.indexOf(item.value) > -1) }"
        @tap="selectItem(item)"
      />
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
import Formatter from '@/utils/Formatter'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    items: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      titleText: '',
      descText: '',
      extraText: '',
      list: [],
      selection: []
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
    formatPrice (num) {
      return Formatter.price(num, this.locale, this.currency)
    },
    setList () {
      const type = this.data.from
      if (this.items.hasOwnProperty(type)) {
        this.list = this.items[type]
        const typeBonus = this.data.or
        if (this.items.hasOwnProperty(typeBonus)) {
          this.list = this.list.concat(this.items[typeBonus])
        }
      } else {
        console.error(`failed to find items of type "${type}"`)
        console.log(`in items[${type}]`, this.items[type])
      }
    },
    setTitle () {
      const pick = this.data
      let str = Formatter.capitalizeFirstLetter(pick.from)
      if (pick.or) {
        str += ` / ${Formatter.capitalizeFirstLetter(this.data.or)}`
      }
      this.titleText = str
    },
    setDesc () {
      const pick = this.data
      const nb = pick.pick === 1 ? 'one' : pick.pick
      let str = `You can pick ${nb} `
      if (pick.extraPrice) {
        str += 'or more'
      } else if (pick.or) {
        str += `${Formatter.singular(pick.from)} or ${nb} ${Formatter.singular(pick.or)}`
      }
      this.descText = str.trim()
    },
    setExtra () {
      if (!this.data.extraPrice) {
        return
      }
      let str = this.formatPrice(this.data.extraPrice)
      str += ' for each extra'
      this.extraText = str
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
      const index = this.selection.indexOf(item.value)
      if (index > -1) {
        console.log('user de-selected item :', item.value)
        this.selection.splice(index, 1)
      } else {
        console.log('user selected item :', item.value)
        if (this.selection.length === this.data.pick && !this.data.extraPrice) {
          const excess = this.selection.shift()
          console.log(`removed excess item : ${excess}`)
        }
        this.selection.push(item.value)
      }
      this.data.valid = this.isValid()
      this.data.price = this.getPrice()
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles";

.pick {
  border-width: 1;
  border-color: $color-disabled;

  &.valid {
    border-color: $color-primary-alt;
    background-image: url('~/assets/images/icons/checkmark.png');
    background-position: right top;
    background-repeat: no-repeat;
  }

  &--title {
    color: $color-primary-alt;
    font-size: 20;
  }

  &--extra {
    font-size: 12;
  }
}
</style>
