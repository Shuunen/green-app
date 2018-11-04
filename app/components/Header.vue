<template>
  <ActionBar>
      <GridLayout width="100%" columns="auto, *, auto">
          <Icon name="menu-white" @tap="openMenu" col="0"/>
          <Icon name="logo-header" size="210x80" col="1" class="logo-header" />
          <Icon name="shopping-cart-white" :number="3" col="2" />
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
.logo-header {
  position: absolute;
}
</style>

