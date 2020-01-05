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
        <TextField ref="password" v-model="user.password" :hint="$t('account.password')" secure="true" returnKeyType="done" :isEnabled="!isLoading" />
        <StackLayout class="mt-s" orientation="horizontal">
          <Switch v-model="hasAccount" :isEnabled="!isLoading" />
          <Label class="fz-s bold ml-m" :text="hasAccount ? $t('login.has-account') : $t('login.no-account')" textWrap="true" verticalAlignment="center" @tap="hasAccount = !hasAccount" />
        </StackLayout>
        <FlexboxLayout justifyContent="center" class="mt-l">
          <Button class="action big" :text="hasAccount ? $t('login.login') : $t('login.sign-up')" :class="[hasAccount ? 'validate' : 'validate-alt' ]" :isEnabled="!isLoading" @tap="submit()" />
        </FlexboxLayout>
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
import { i18n } from '@/plugins/i18n'

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
    console.log('Login mounted with user from store that has email :', this.user.email)
  },

  methods: {
    ...mapActions(['goHome', 'doLogin', 'startSignup', 'doShowError']),

    focusPassword () {
      this.$refs.password.nativeView.focus()
    },

    submit () {
      // if user choose a lang at login screen, save it for later
      this.user.locale = i18n.locale
      console.log('Login : submit user data :', JSON.stringify(this.user, null, 2))
      if (!this.user.isValidEmail()) {
        return this.doShowError('error.invalid-email')
      }
      if (!this.user.isValidPassword()) {
        return this.doShowError('error.invalid-password')
      }
      if (getConnectionType() === connectionType.none) {
        return this.doShowError('error.offline')
      }
      if (this.hasAccount) {
        this.doLogin(this.user)
      } else {
        this.startSignup(this.user)
      }
    },

  },
}
</script>
