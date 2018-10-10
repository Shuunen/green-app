<template>
    <Page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
        <StackLayout>

            <Label class="main-label" text="Green Login" />

            <!-- form controls -->
            <GridLayout class="form-controls" rows="auto, auto">
                <TextField
                  hint="Email Address"
                  keyboardType="email"
                  returnKeyType="next"
                  @returnPress="focusPassword()"
                  v-model="user.email"
                  :iEnabled="!isAuthenticating"
                  autocorrect="false"
                  autocapitalizationType="none"
                  :class="{ light: !isLoggingIn}"
                  row="0" />
                <TextField ref="password"
                  hint="Password"
                  secure="true"
                  returnKeyType="done"
                  @returnPress="submit()"
                  v-model="user.password"
                  :isEnabled="!isAuthenticating"
                  :class="{ light: !isLoggingIn }"
                  row="1" />
            </GridLayout>

            <!-- login / sign up button -->
            <Button
              :text="isLoggingIn ? 'Login' : 'Sign up'"
              :isEnabled="!isAuthenticating"
              class="submit-button"
              @tap="submit()" />

        </StackLayout>
    </Page>
</template>


<script>
import { connectionType, getConnectionType } from 'tns-core-modules/connectivity'
import Products from '@/components/Products'
import User from '@/models/User'

export default {
  name: 'login',

  data() {
    return {
      isLoggingIn: true,
      isAuthenticating: false,
      user: new User('romain.racamier@gmail.com', 'my-pass')
    }
  },

  methods: {

    focusPassword() {
      this.$refs.password.nativeView.focus();
    },

    submit() {
      console.log('submit', this.user)
      if (!this.user.isValidEmail()) {
        alert("Enter a valid email address.")
        return;
      }
      this.isAuthenticating = true;
      this.login();
    },

    login() {
      if (getConnectionType() === connectionType.none) {
        alert("app requires an internet connection to log in.")
        return;
      }
      this.isAuthenticating = false;
      console.log('navigating to products page')
      this.$navigateTo(Products)
      console.log('navigated to products page')
    },

  },

  mounted() {
    console.log('Login mounted')
  }
}
</script>

<style lang="scss">
.login {

  .main-label {
    horizontal-align: center;
    color: black;
  }

  Button,
  TextField {
    margin-left: 16;
    margin-right: 16;
    margin-bottom: 10;
  }

  TextField {
    color: black;
    placeholder-color: #ACA6A7;
    margin-bottom: 10;

    &.light {
      color: #C4AFB4;
      placeholder-color: #C4AFB4;
    }
  }

  .submit-button {
    background-color: #CB1D00;
    color: white;
    margin-top: 15;
  }
}
</style>
