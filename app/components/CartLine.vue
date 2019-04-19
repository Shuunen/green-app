<template>
  <FlexboxLayout class="cart--line">
    <Label flexGrow="1" :text="desc" />
    <Label :text="price" />
  </FlexboxLayout>
</template>

<script>

export default {
  props: {
    desc: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      default: 0
    },
    animated: {
      type: Boolean,
      default: true
    }
  },
  created () {
    console.log('Formula page created')
    this.animate()
  },
  methods: {
    animate () {
      console.log('animate !')
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles";

.cart--line {
  color: $color-black;
}
</style>
