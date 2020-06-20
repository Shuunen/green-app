<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="p-l bg">
      <StackLayout flexGrow="1" />
      <app-icon class="mb-l" height="70" name="logo-green-is-better-2020" />
      <StackLayout flexGrow="1">
        <Label :text="$t('login.welcome')" class="fz-m mt-l mb-l black" textWrap="true" />
        <!-- TODO https://github.com/Shuunen/green-app/issues/256 placeholder color-->
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
        <!-- TODO https://github.com/Shuunen/green-app/issues/125 reveal password -->
        <!-- TODO https://github.com/Shuunen/green-app/issues/256 placeholder color -->
        <TextField ref="password" v-model="user.password" :hint="$t('account.password')" secure="true" returnKeyType="done" :isEnabled="!isLoading" />
        <FlexboxLayout justifyContent="center" class="mt-l">
          <Button class="action big" :text="hasAccount ? $t('login.login') : $t('login.sign-up')" :class="[hasAccount ? 'validate' : 'validate-alt' ]" :isEnabled="!isLoading" @tap="submit()" />
        </FlexboxLayout>
        <Button class="action" :text="$t('common.back-login')" @tap="cancel" />
        <!-- TODO https://github.com/Shuunen/green-app/issues/224
        <Label class="mt-s mb-m black" horizontalAlignment="center" :text="$t('login.forgot-password')" />-->
        <ActivityIndicator :busy="isLoading" />
      </StackLayout>
      <app-lang-selector />
    </FlexboxLayout>
  </Page>
</template>

<script>
import { apiService } from '@/services'
import { connectionType, getConnectionType } from 'tns-core-modules/connectivity'
import Home from '@/pages/home'
import AccountEdit from '@/pages/account-edit'
import PreLogin from '@/pages/pre-login'
import { showError, prettyPrint } from '@/utils'

export default {
  props: {
    hasAccount: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      user: apiService.user,
      isLoading: false,
    }
  },
  mounted () {
    console.log('Login page mounted, user hasAccount ?', this.hasAccount)
    /*
    this.user.email = 'user5@example.com'
    this.user.password = 'user5'
    */
  },
  methods: {
    focusPassword () {
      this.$refs.password.nativeView.focus()
    },
    cancel () {
      console.log('login : back to pre login')
      this.$navigateTo(PreLogin)
    },
    async submit () {
      console.log('Login : user submitted data :', this.user.email, this.user.password)
      if (!this.user.hasValidEmail) return showError('error.invalid-email')
      if (!this.user.hasValidPassword) return showError('error.invalid-password')
      if (getConnectionType() === connectionType.none) return showError('error.offline')
      this.isLoading = true
      const status = await (this.hasAccount ? apiService.doLogin() : apiService.doSignup())
      this.isLoading = false
      console.log('got status', prettyPrint(status))
      if (status.ok) this.$navigateTo(this.hasAccount ? Home : AccountEdit)
    },
  },
}
</script>
