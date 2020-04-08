<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="p-l bg">
      <StackLayout flexGrow="1" />
      <app-icon class="mb-l" height="70" name="logo-green-alt" />
      <StackLayout flexGrow="1">
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
      <app-lang-selector />
    </FlexboxLayout>
  </Page>
</template>

<script>
import { connectionType, getConnectionType } from 'tns-core-modules/connectivity'
import Home from '@/pages/home'
import { apiService } from '@/services/api-service'

export default {
  data () {
    return {
      user: apiService.user,
      hasAccount: true,
      isLoading: false,
    }
  },
  mounted () {
    console.log('Login page mounted')
    /*
    this.user.email = 'plop@example.com'
    this.user.password = 'plop'
    */
  },
  methods: {
    focusPassword () {
      this.$refs.password.nativeView.focus()
    },
    async submit () {
      console.log('Login : user submitted data :', this.user.email, this.user.password)
      if (!this.user.hasValidEmail) {
        return apiService.showError('error.invalid-email')
      }
      if (!this.user.hasValidPassword) {
        return apiService.showError('error.invalid-password')
      }
      if (getConnectionType() === connectionType.none) {
        return apiService.showError('error.offline')
      }
      this.isLoading = true
      const status = await (this.hasAccount ? apiService.doLogin() : apiService.doSignup())
      this.isLoading = false
      if (status !== 'ok') return console.log('unexpected point reached, status is', status)
      this.$navigateTo(Home)
    },
  },
}
</script>
