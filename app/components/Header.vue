<template>
  <ActionBar>
      <GridLayout width="100%" columns="auto, *, auto">
          <Label class="menu" text="MENU" @tap="openMenu" col="0"/>
          <Label class="title" text="Welcome to Green !" col="1" />
          <Icon class="cart" name="shopping-cart-white" :number="3" col="2" />
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
