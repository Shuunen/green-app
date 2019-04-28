<template>
  <FlexboxLayout class="black" @loaded="animate">
    <StackLayout flexGrow="1">
      <Label :text="description" />
      <StackLayout v-if="items.length" class="p10">
        <label
          v-for="(item, index) in items"
          :key="index"
          :text="'- ' + item"
        />
      </StackLayout>
    </StackLayout>
    <Label :class="[isIncluded() ? 'disabled' : 'primary-alt' ]" :text="price" />
  </FlexboxLayout>
</template>

<script>

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    selection: {
      type: Array,
      default: () => []
    },
    price: {
      type: String,
      required: true
    },
    animated: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      description: '',
      items: []
    }
  },
  created () {
    this.setDescription()
  },
  methods: {
    setDescription () {
      if (this.selection.length === 0) {
        this.description = this.type
        return
      }

      if (this.selection.length === 1) {
        this.description = this.type + ' : ' + this.selection[0].title
        return
      }

      this.type += 's'
      this.description = this.type + ' : '
      this.items = this.selection.map(s => s.title)
    },
    animate (args) {
      args.object.translateX = -300
      args.object.opacity = 0
      const opts = {
        translate: { x: 0, y: 0 },
        opacity: 1,
        duration: 1000
      }
      setTimeout(() => args.object.animate(opts), this.delay)
    },
    isIncluded () {
      return this.price.replace(/\D/g, '') === '000'
    }
  }
}
</script>
