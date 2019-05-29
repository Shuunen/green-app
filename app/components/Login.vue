<template>
  <Page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <StackLayout>
      <Label class="main-label" text="Green Login" />

      <!-- form controls -->
      <GridLayout class="form-controls" rows="auto, auto">
        <TextField
          v-model="user.email"
          hint="Email Address"
          keyboardType="email"
          returnKeyType="next"
          :iEnabled="!isAuthenticating"
          autocorrect="false"
          autocapitalizationType="none"
          :class="{ light: !isLoggingIn}"
          row="0"
          @returnPress="focusPassword()"
        />
        <TextField
          ref="password"
          v-model="user.password"
          hint="Password"
          secure="true"
          returnKeyType="done"
          :isEnabled="!isAuthenticating"
          :class="{ light: !isLoggingIn }"
          row="1"
          @returnPress="submit()"
        />
      </GridLayout>

      <!-- login / sign up button -->
      <Button :text="isLoggingIn ? 'Login' : 'Sign up'" :isEnabled="!isAuthenticating" class="submit-button" @tap="submit()" />
    </StackLayout>
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
      user: new User('romain.racamier@gmail.com', 'my-pass')
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
    }

  }
}
</script>

<style lang="scss">
.login {
  .main-label {
    horizontal-align: center;
    color: black;
  }

  button,
  TextField {
    margin-left: 16;
    margin-right: 16;
    margin-bottom: 10;
  }

  TextField {
    color: $color-black;
    placeholder-color: #aca6a7;
    margin-bottom: 10;

    &.light {
      color: #c4afb4;
      placeholder-color: #c4afb4;
    }
  }

  .submit-button {
    background-color: #cb1d00;
    color: white;
    margin-top: 15;
  }
}
</style>
