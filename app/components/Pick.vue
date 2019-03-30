<template>
  <StackLayout class="pick mt15 p10" :class="{ valid }">
    <Label :text="capitalizeFirstLetter(data.from)" class="pick--title" />
  </StackLayout>
</template>

<script>
import Formatter from '@/utils/Formatter'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    valid: () => {
      return false
    }
  },
  created () {
    console.log('Pick component created')
    console.log('need to fetch list of :' + this.data.from)
  },
  methods: {
    capitalizeFirstLetter: (str) => Formatter.capitalizeFirstLetter(str),
    select (data) {
      console.log('user selected :', data)
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
}
</style>
