<template>
  <FlexboxLayout class="order-line pt-s pb-m pl-m pr-m">
    <StackLayout flexGrow="1">
      <Label :text="store" class="fz-m bold" />
      <Label :text="capitalizeFirstLetter(date)" class="fz-s" />
      <Label :text="details.join(' • ')" class="fz-s" />
    </StackLayout>
    <Label :text="price" class="fz-s pt-s" />
  </FlexboxLayout>
</template>

<script>
import { capitalizeFirstLetter } from '@/utils'

export default {
  props: {
    store: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    details: {
      type: Array,
      required: true,
      default: () => [],
    },
    price: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      capitalizeFirstLetter,
    }
  },
}
</script>
