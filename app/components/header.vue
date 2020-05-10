<template>
  <FlexboxLayout flexDirection="column" flexShrink="0">
    <FlexboxLayout class="pt-m pb-m pl-l pr-l bg-primary" justifyContent="space-between" height="50">
      <app-icon :name="onHome ? '' : 'home-white'" height="25" width="25" @tap.native="$navigateTo(Home)" />
      <Label class="white fz-m ml-s bold" :text="user.firstname + ' ' + user.lastname" @tap="$navigateTo(Account)" />
      <app-icon :name="onAccount ? 'logout-white' : 'user-white'" height="25" width="25" @tap.native="onAccount ? doLogout() : $navigateTo(Account)" />
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script>
import { apiService } from '@/services'
import Account from '@/pages/account'
import Home from '@/pages/home'
import PreLogin from '@/pages/pre-login'

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
  methods: {
    doLogout () {
      apiService.doLogout()
      this.$navigateTo(PreLogin)
    },
  },
}
</script>
