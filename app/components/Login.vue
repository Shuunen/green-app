<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="p-l bg">
      <StackLayout flexGrow="1" />
      <Icon class="logo mb-l" height="70" name="logo-green-alt" />
      <StackLayout flexGrow="1">
        <!--<SVGImage src="~/assets/images/icons/user.svg" height="200" />-->
        <Label :text="$t('login.welcome')" class="fz-m mt-l mb-l" textWrap="true" />
        <TextField
          v-model="user.email"
          :hint="$t('account.email')"
          keyboardType="email"
          returnKeyType="next"
          :iEnabled="!isAuthenticating"
          autocorrect="false"
          autocapitalizationType="none"
          @returnPress="focusPassword()"
        />
        <TextField ref="password" v-model="user.password" :hint="$t('account.password')" secure="true" returnKeyType="done" :isEnabled="!isAuthenticating" @returnPress="submit()" />
        <StackLayout class="mt-s" orientation="horizontal">
          <Switch v-model="hasAccount" />
          <Label :text="hasAccount ? $t('login.has-account') : $t('login.no-account')" textWrap="true" verticalAlignment="center" class="ml-m" />
        </StackLayout>
        <Button class="action validate mt-m" :text="hasAccount ? $t('login.login') : $t('login.sign-up')" :isEnabled="!isAuthenticating" @tap="submit()" />
        <Label class="mt-s" horizontalAlignment="center" :text="$t('login.forgot-password')" />
      </StackLayout>
      <LangSelector />
    </FlexboxLayout>
  </Page>
</template>

<script>
import { connectionType, getConnectionType } from 'tns-core-modules/connectivity'
import { mapGetters, mapActions } from 'vuex'

import Logged from '@/pages/Logged'
import User from '@/models/User'
import LangSelector from '@/components/LangSelector'
import Icon from '@/components/Icon'

export default {
  components: { LangSelector, Icon },

  data () {
    return {
      hasAccount: true,
      isLoggingIn: true,
      isAuthenticating: false,
      user: new User('romain.racamier@gmail.com', 'my-pass'),
    }
  },

  computed: {
    ...mapGetters({ isLoading: 'isLoading' }),
  },

  mounted () {
    console.log('Login mounted with user', this.user.email)
  },

  methods: {
    ...mapActions(['goAccount', 'startOrder']),

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
      setTimeout(() => {
        this.isAuthenticating = false
        console.log('navigating to home page')
        this.$navigateTo(Logged, { clearHistory: true })
      }, 4000)
    },

  },
}
</script>

<style>
.main-label {
  horizontal-align: center;
}
.here {
  border-width: 2;
  border-color: salmon;
}
</style>
