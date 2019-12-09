<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" justifyContent="center" flexGrow="1" class="bg p-l">
      <SVGImage src="~/assets/images/icons/user.svg" height="200" />
        <TextField
          v-model="user.email"
          hint="Email Address"
          keyboardType="email"
          returnKeyType="next"
          :iEnabled="!isAuthenticating"
          autocorrect="false"
          autocapitalizationType="none"
          row="0"
          @returnPress="focusPassword()"
        />
      <TextField ref="password" v-model="user.password" hint="Password" secure="true" returnKeyType="done" :isEnabled="!isAuthenticating" row="1" @returnPress="submit()" />
      <Button class="action mt-m mb-l" :text="isLoggingIn ? $t('account.login') : $t('account.sign-up')" :isEnabled="!isAuthenticating" @tap="submit()" />
    </FlexboxLayout>
  </Page>
</template>

<script>
import { connectionType, getConnectionType } from 'tns-core-modules/connectivity'
import Products from '@/components/Products'
import User from '@/models/User'

export default {
  name: 'Login',

  data () {
    return {
      isLoggingIn: true,
      isAuthenticating: false,
      user: new User('romain.racamier@gmail.com', 'my-pass'),
    }
  },

  mounted () {
    console.log('Login mounted')
  },

  methods: {

    focusPassword () {
      this.$refs.password.nativeView.focus()
    },

    submit () {
      console.log('submit', this.user)
      if (!this.user.isValidEmail()) {
        alert('Enter a valid email address.')
        return
      }
      this.isAuthenticating = true
      this.login()
    },

    login () {
      if (getConnectionType() === connectionType.none) {
        alert('app requires an internet connection to log in.')
        return
      }
      this.isAuthenticating = false
      console.log('navigating to products page')
      this.$navigateTo(Products)
      console.log('navigated to products page')
    },

  },
}
</script>

<style>
.main-label {
  horizontal-align: center;
  color: black;
}
.submit-button {
  background-color: #cb1d00;
  color: white;
  margin-top: 15;
}
</style>
