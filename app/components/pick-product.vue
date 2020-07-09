<template>
  <StackLayout class="pick mt-m p-m" :class="{ valid: data.valid }">
    <Label :text="data.titleText" class="pick--title mb-s" />
    <Label v-if="descText.length" :text="descText" class="pick--desc black ml-s mb-s" />
    <WrapLayout>
      <StackLayout v-for="item in list" :key="item.value"  @tap="showModal(item )" @onDoubleTap="selectItem(item)" >
          <Image :src='"https://images.greenisbetter-app.com/"+item.picture'
           :class="{ 'selected-image': isItemSelected(item) }"
           stretch="none"/>
          <Label :text="itemText(item)" width="50%" :class="{ selected: isItemSelected(item) }" />
      </StackLayout>
    </WrapLayout>
  </StackLayout>
</template>
 
<script>
import { readablePrice } from '@/utils'
import modal from "./modal-product";

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
  computed: {
    extraMode: function () {
      return this.selection.length >= this.data.amount
    },
  },
  created () {
    console.log('Pick component created', JSON.stringify(this.data))
    if (!this.data.from || !this.data.from.length) return console.error('\n data.from empty /!\\ \n')
    this.setTitle()
    this.setDesc()
    this.setList()
  },
  methods: {
    showModal(item) {
      this.$showModal(modal, { fullscreen: true, props: { item : item , selected : this.isItemSelected(item)}})
      .then((data)=>{
        console.log(data)
        if(data.addCart){
          this.selectItem(data.item)
        }
      });
    },
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
    isValid () {
      return this.selection.length > 0 // at least one item selected
    },
    isItemSelected (item) {
      return this.selection.findIndex(s => s.value === item.value) > -1
    },
    itemText (item) {
      let text = this.$t(item.title)
      const index = this.selection.findIndex(s => s.value === item.value)
      const unselected = index === -1
      const selectedExtra = index >= this.data.amount
      if (item.price && this.extraMode && (unselected || selectedExtra)) text += ` (+${readablePrice(item.price)})`
      return text.substring(0,30)
    },
    getPrice () {
      let total = 0
      if (this.selection.length <= this.data.amount) return total
      for (let i = this.data.amount; i < this.selection.length; i++) total += this.selection[i].price
      console.log('calculated a total of', readablePrice(total), 'for pick', this.data.titleText)
      return total
    },
    reduceCombos (str) {
      return str.replace('soup-wrap', 'wrap-soup').replace('dessert-drink', 'drink-dessert')
    },
    test(item){
      console.log(item)
      
    }
    ,
    selectItem (item) {
      const index = this.selection.findIndex(s => s.value === item.value)
      console.log(`found ${item.value} at index`, index)
      const deselected = index > -1
      console.log(`user ${deselected ? 'de-' : ''}selected item :`, item.value)
      if (deselected) {
        this.selection.splice(index, 1)
      } else {
        if (this.selection.length === this.data.maxAmount) {
          const excess = this.selection.shift()
          console.log(`removed excess item : ${excess.value}`)
        }
        this.selection.push(item)
      }
      console.log('selection is now', this.selection)
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
  color: white;
}

.selected-image{
  border-color:var(--color-alt);
  border-style: solid;
  border-width: 1px;
}
</style>
