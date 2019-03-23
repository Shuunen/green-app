<template>
  <StackLayout backgroundColor="#ffffff">
    <Label
      class="drawer-header fz25"
      text="Benjamin"
    />
    <Label
      class="drawer-item"
      text="Home"
      @tap="goHome"
    />
    <Label
      class="drawer-item"
      text="My account"
    />
    <Label
      class="drawer-item"
      text="My orders"
    />
    <Label
      class="drawer-item"
      text="Logout"
      @tap="doLogout"
    />
  </StackLayout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: { },
  methods: {
    ...mapActions(['doLogout', 'goHome'])
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
}

.drawer-item {
  padding: 8 16;
  color: #333333;
}
</style>
