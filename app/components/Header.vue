<template>
  <ActionBar>
      <GridLayout columns="auto, *, auto, 15">
          <Icon name="menu-white" @tap.native="toggleMenu" col="0"/>
          <Label class="store" text="Green La Beaujoire (44)" col="1" />
          <Icon name="shopping-cart-white" :number="3" col="2" />
          <Label col="3" />
      </GridLayout>
  </ActionBar>
</template>

<script>
import Icon from "@/components/Icon";
import { mapActions } from "vuex";

export default {
  components: {
    Icon
  },
  methods: {
    ...mapActions(["toggleMenu"])
  }
};
</script>

<style lang="scss">
@import "../assets/styles/shared";

ActionBar {
  background-color: $color-primary;
  color: $color-primary-alt;
}

.store {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  font-weight: bold;
}
</style>

