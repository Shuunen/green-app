<template>
  <Image :src="src" class="icon" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    src: function () {
      if (!this.name) return ''
      const file = this.name + (this.name.indexOf('.') > -1 ? '' : '.png')
      return '~/assets/images/icons/' + file
    },
  },
}
</script>
