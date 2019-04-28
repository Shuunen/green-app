<template>
  <FlexboxLayout flexDirection="column" class="bg">
    <StackLayout flexGrow="1">
      <Label
        class="drawer-header fz25 mb15"
        text="Benjamin"
      />
      <Label
        class="drawer-item"
        :text="$t('common.home')"
        @tap="goHome"
      />
      <Label
        class="drawer-item"
        :text="$t('common.my-account')"
      />
      <Label
        class="drawer-item"
        :text="$t('common.my-orders')"
      />
      <Label
        class="drawer-item"
        :text="$t('common.logout')"
        @tap="doLogout"
      />
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
