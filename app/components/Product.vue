<template>
  <FlexboxLayout
    class="product h50"
    :class="[ data.type ]"
    justifyContent="space-between"
    alignItems="center"
  >
    <Icon
      class="product-icon w30"
      flexShrink="0"
      name="logo-g"
    />
    <Label
      class="product-name ml5"
      flexGrow="1"
      :text="data.name"
    />
    <Label
      class="product-price w50 ml10 mr5"
      flexShrink="0"
      :text="formatPrice(data.price)"
    />
    <Icon
      class="product-add w30 mr5"
      flexShrink="0"
      name="shopping-cart-add-grey"
      @tap.native="addProduct(data)"
    />
  </FlexboxLayout>
</template>

<script>
import Icon from '@/components/Icon'
import Formatter from '@/utils/Formatter'
import { mapGetters } from 'vuex'

/* Props data is like :
{
  id: 11,
  name: 'homemade dessert Sin Seguritat',
  price: 9.45,
  type: 'dessert'
}
*/
export default {
  name: 'Product',
  components: {
    Icon
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading'
    })
  },
  methods: {
    formatPrice: (num) => Formatter.price(num),
    addProduct (data) {
      console.log('user wants to add product :', data.name)
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles";

/* Debug
.product {
  &-icon {
    background-color: orange;
  }
  &-name {
    background-color: green;
  }
  &-price {
    background-color: purple;
  }
  &-add {
    background-color: palevioletred;
  }
}
*/
</style>
