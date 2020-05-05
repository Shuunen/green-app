<template>
  <FlexboxLayout flexDirection="column" flexShrink="0">
    <FlexboxLayout class="pt-m pb-m pl-l pr-l bg-primary" justifyContent="space-between" height="50">
      <app-icon :name="onHome ? '' : 'home-white'" height="25" width="25" @tap.native="$navigateTo(Home)" />
      <Label class="white fz-m ml-s bold" :text="user.firstname + ' ' + user.lastname" @tap="$navigateTo(Account)" />
      <app-icon :name="onAccount ? '' : 'user-white'" height="25" width="25" @tap.native="$navigateTo(Account)" />
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
    onAccount: {
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
