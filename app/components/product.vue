<template>
  <FlexboxLayout class="product" :class="[ data.type ]" justifyContent="space-between" alignItems="center">
    <app-icon class="product-icon" flexShrink="0" name="logo-g" />
    <Label class="product-name ml-s" flexGrow="1" :text="data.name" />
    <Label class="product-price ml-m mr-s" flexShrink="0" :text="readablePrice(data.price)" />
    <app-icon class="product-add mr-s" flexShrink="0" name="shopping-cart-add-grey" @tap.native="addProduct(data)" />
  </FlexboxLayout>
</template>

<script>
import { readablePrice } from '@/utils'

/* Props data is like :
{
  id: 11,
  name: 'homemade dessert Sin Seguritat',
  price: 9.45,
  type: 'dessert'
}
*/
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      readablePrice,
    }
  },
  methods: {
    addProduct (data) {
      console.log('user wants to add product :', data.name)
    },
  },
}
</script>

<style>
.product {
  height: 50;
}
.product-add,
.product-icon {
  width: 30;
}
.product-price {
  width: 50;
}
</style>
