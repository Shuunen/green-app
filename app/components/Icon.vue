<template>
  <Image
    class="icon"
    :class="[size]"
    :src="src"
  />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'small'
    },
    number: {
      type: Number,
      default: 0
    }
  },
  computed: {
    src: function () {
      const file = this.name + (this.name.indexOf('.') > -1 ? '' : '.png')
      return '~/assets/images/icons/' + file
    }
  }
}
</script>

<style lang="scss">
.icon {
  /* background-color: red; */
  &.small {
    $size: 30;
    height: $size;
    width: $size;
  }
  &.medium {
    $size: 50;
    height: $size;
    width: $size;
  }
  &.210x80 {
    height: 80;
    width: 210;
  }
  &.100 {
    height: 100;
    width: 100;
  }
}
</style>
