<template>
  <StackLayout class="pick mt15 p10" :class="{ valid }">
    <Label :text="capitalizeFirstLetter(data.from)" class="pick--title" />
    <Label :text="descText" class="pick--desc" />
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
      descText: '',
      list: [],
      selection: []
    }
  },
  computed: {
    valid: () => {
      return false
    }
  },
  created () {
    console.log('Pick component created')
    // console.log('need to fetch list of :' + this.data.from)
    this.setDesc()
    this.setList()
  },
  methods: {
    setList () {
      const type = this.data.from
      if (this.items.hasOwnProperty(type)) {
        this.list = this.items[type]
      } else {
        console.error(`failed to find items of type "${type}"`)
        console.log(`in items[${type}]`, this.items[type])
      }
    },
    setDesc () {
      const pick = this.data
      this.descText = `You can pick ${pick.pick === 1 ? 'one' : pick.pick}`
      if (pick.orMore) {
        this.descText += ' or more'
      }
    },
    capitalizeFirstLetter: str => Formatter.capitalizeFirstLetter(str),
    selectItem (item) {
      const index = this.selection.indexOf(item.value)
      if (index > -1) {
        console.log('user de-selected item :', item.value)
        return this.selection.splice(index, 1)
      }
      console.log('user selected item :', item.value)
      if (this.selection.length === this.data.pick && !this.data.orMore) {
        const excess = this.selection.shift()
        console.log(`removed excess item : ${excess}`)
      }
      this.selection.push(item.value)
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles";

.pick {
  border-width: 2;
  border-color: $color-grey;

  &.valid {
    border-color: $color-primary;
  }

  &--title {
    font-size: 20;
  }

  &--button {
    color: $color-grey;
    &.selected {
      color: $color-primary-alt;
      background-color: $color-primary;
    }
  }
}
</style>
