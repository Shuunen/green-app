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
          :isEnabled="!isLoading"
          autocorrect="false"
          autocapitalizationType="none"
          @returnPress="focusPassword()"
        />
        <TextField ref="password" v-model="user.password" :hint="$t('account.password')" secure="true" returnKeyType="done" :isEnabled="!isLoading" @returnPress="submit()" />
        <StackLayout class="mt-s" orientation="horizontal">
          <Switch v-model="hasAccount" :isEnabled="!isLoading" />
          <Label :text="hasAccount ? $t('login.has-account') : $t('login.no-account')" textWrap="true" verticalAlignment="center" class="ml-m" />
        </StackLayout>
        <Button class="action validate mt-m" :text="hasAccount ? $t('login.login') : $t('login.sign-up')" :isEnabled="!isLoading" @tap="submit()" />
        <Label class="mt-s mb-m" horizontalAlignment="center" :text="$t('login.forgot-password')" />
        <ActivityIndicator :busy="isLoading" />
      </StackLayout>
      <LangSelector />
    </FlexboxLayout>
  </Page>
</template>

<script>
import { connectionType, getConnectionType } from 'tns-core-modules/connectivity'
import { mapGetters, mapActions } from 'vuex'

import LangSelector from '@/components/LangSelector'
import Icon from '@/components/Icon'
import User from '@/models/User'

export default {
  components: { LangSelector, Icon },

  data () {
    return {
      user: {},
      hasAccount: true,
      isLoggingIn: true,
    }
  },

  computed: {
    ...mapGetters({ isLoading: 'isLoading', storeUser: 'user' }),
  },

  mounted () {
    this.user = new User({ ...this.storeUser })
    console.log('Login mounted with user', this.user.email)
  },

  methods: {
    ...mapActions(['goHome', 'doLogin']),

    focusPassword () {
      this.$refs.password.nativeView.focus()
    },

    submit () {
      console.log('Login : submit user data :', this.user)
      if (!this.user.isValidEmail()) {
        return alert(this.$t('error.invalid-email'))
      }
      if (!this.user.isValidPassword()) {
        return alert(this.$t('error.invalid-password'))
      }
      if (getConnectionType() === connectionType.none) {
        return alert('app requires an internet connection to log in or sign up.')
      }
      if (this.hasAccount) {
        this.doLogin(this.user)
      } else {
        alert('TODO : create account')
      }
    },

  },
}
</script>

<style>
.fullscreen-loader {
  background-color: red;
}
.main-label {
  horizontal-align: center;
}
.here {
  border-width: 2;
  border-color: salmon;
}
</style>
