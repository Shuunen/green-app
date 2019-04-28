<template>
  <FlexboxLayout flexDirection="column" class="bg">
    <StackLayout flexGrow="1">
      <Label class="drawer-header fz25 mb15" text="Benjamin" />
      <Label :text="$t('common.home')" class="drawer-item" @tap="goHome" />
      <Label :text="$t('common.my-account')" class="drawer-item" />
      <Label :text="$t('common.my-orders')" class="drawer-item" />
      <Label :text="$t('common.logout')" class="drawer-item" @tap="doLogout" />
    </StackLayout>
    <LangSelector class="mb15" />
  </FlexboxLayout>
</template>

<script>
import { mapActions } from 'vuex'
import LangSelector from '@/components/LangSelector'

export default {
  components: { LangSelector },
  methods: {
    ...mapActions(['doLogout', 'goHome'])
  }
}
</script>

<style lang="scss">
@import "../assets/styles";

.drawer-header {
  padding: 50 16 16 16;
  background-color: $color-primary;
  color: $color-white;
}

.drawer-item {
  padding: 8 16;
  color: $color-black;
}
</style>
