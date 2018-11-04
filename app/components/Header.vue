<template>
  <ActionBar>
      <GridLayout columns="auto, *, auto, 15">
          <Icon name="menu-white" @tap.native="openMenu" col="0"/>
          <Label class="store" text="Green La Beaujoire (44)" col="1" />
          <Icon name="shopping-cart-white" :number="3" col="2" />
          <Label col="3" />
      </GridLayout>
  </ActionBar>
</template>

<script>
import store from "@/store";
import Icon from "@/components/Icon";
import { mapActions } from "vuex";

export default {
  components: {
    Icon
  },
  methods: {
    ...mapActions(["openMenu"])
  }
}
</script>

<style>
.store {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  font-weight: bold;
}
</style>

