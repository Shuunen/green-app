<template>
  <StackLayout backgroundColor="#ffffff">
    <Label class="drawer-header" text="Benjamin"/>
    <Label class="drawer-item" text="My account"/>
    <Label class="drawer-item" text="My orders"/>
    <Label class="drawer-item" text="Logout" @tap="doLogout"/>
  </StackLayout>
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
    ...mapActions(["doLogout"])
  }
}
</script>


<style lang="scss">
@import "../assets/styles";

.drawer-header {
  padding: 50 16 16 16;
  margin-bottom: 16;
  background-color: $color-primary;
  color: $color-primary-alt;
  font-size: $font-size-h1;
}

.drawer-item {
  padding: 8 16;
  color: #333333;
  font-size: $font-size-h3;
}
</style>
