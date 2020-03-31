<template>
  <FlexboxLayout flexDirection="column">
    <FlexboxLayout class="pt-m pb-m pl-l pr-l bg-primary" justifyContent="space-between" flexShrink="0">
      <app-icon :name="onHome ? '' : 'home-white'" height="25" @tap.native="$navigateTo(Home)" />
      <Label class="white fz-m ml-s bold" :text="user.storeLabel" @tap="$navigateTo(Account)" />
      <app-icon name="settings-white" height="25" @tap.native="$navigateTo(Account)" />
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script>
import Account from '@/pages/account'
import Home from '@/pages/home'

export default {
  props: {
    onHome: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
      Account,
      Home,
    }
  },
  created () {
    console.log('header created with user email', this.user.email)
  },
}
</script>
