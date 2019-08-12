<template>
  <Page actionBarHidden="true" class="login" backgroundSpanUnderStatusBar="true">
  <StackLayout height="350">
    <Icon flexGrow="2" class="logo" name="logo-green-alt"/>

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
    <Button :text="isLoggingIn ? 'Login' : 'Sign up'" :isEnabled="!isAuthenticating" class="submit-button bold" @tap="submit()"/>
  </StackLayout>
  </Page>
</template>

<script>
import { connectionType, getConnectionType } from 'tns-core-modules/connectivity'
import Icon from '@/components/Icon'
import Logged from '@/pages/Logged'
import User from '@/models/User'

export default {
  name: 'Login',
  components: { Icon },

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
      console.log('navigating to home page')
      this.$navigateTo(Logged, { clearHistory: true })
      console.log('navigated to home page')
    },

  },
}
</script>

<style lang="scss" scoped>
@import "../assets/styles";

.login {
  .logo {
    width: 70%;
  }

  .form-controls {
    margin-top: 50px;
  }

  button,
  TextField {
    margin-left: 16;
    margin-right: 16;
    margin-bottom: 10;
  }

  TextField {
    color: $color-black;
    border-bottom-width: 1;
    border-bottom-color: $color-black;
    margin-bottom: 20;
    placeholder-color: #aca6a7;

    &.light {
      color: #c4afb4;
      border-bottom-width: 1;
      border-bottom-color: #c4afb4;
      placeholder-color: #c4afb4;
    }
  }

  .submit-button {
    background-color: #cb1d00;
    color: white;
    font-size: 20px;
    margin-top: 15;
  }
}
</style>
