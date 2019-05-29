<template>
  <Image :class="cls" :src="src" class="icon" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    class: {
      name: 'cls',
      type: String,
      default: 'h30',
    },
    number: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      cls: '',
    }
  },
  computed: {
    src: function () {
      const file = this.name + (this.name.indexOf('.') > -1 ? '' : '.png')
      return '~/assets/images/icons/' + file
    },
  },
}
</script>
