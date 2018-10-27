<template>
  <Image class="icon" :class="[size]" :src="'~/assets/images/'+ name +'.png'" />
</template>

<script>
export default {
  name: "icon",
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'small'
    },
    number: Number
  }
};
</script>

<style lang="scss">
.icon {
  /* background-color: #CB1D00; */
  &.small {
    $size: 30;
    height: $size;
    width: $size;
  }
  &.210x80 {
    height: 80;
    width: 210;
  }
}
</style>
