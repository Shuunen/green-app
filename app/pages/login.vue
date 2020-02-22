<template>
  <Page actionBarHidden="true">
    <app-account-editor v-if="user.email && isEditing" :cancellable="false" @submit="update" />
    <FlexboxLayout v-else flexDirection="column" class="p-l bg">
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
import Formatter from '@/utils/formatter'

export default {
  data () {
    return {
      user: apiService.user,
      hasAccount: true,
      isLoading: false,
      isEditing: false,
    }
  },
  methods: {
    focusPassword () {
      this.$refs.password.nativeView.focus()
    },
    update () {
      console.log('account : user completed his data', Formatter.prettyPrint(apiService.user))
      this.$navigateTo(Home)
    },
    submit () {
      console.log('Login : submit user data :', this.user.email, this.user.password)
      if (!this.user.hasValidEmail) {
        return apiService.showError('error.invalid-email')
      }
      if (!this.user.hasValidPassword) {
        return apiService.showError('error.invalid-password')
      }
      // apiService.user = this.user
      if (getConnectionType() === connectionType.none) {
        return apiService.showError('error.offline')
      }
      this.isLoading = true
      if (this.hasAccount) {
        return apiService.doLogin().then(status => {
          this.isLoading = false
          if (status !== 'ok') return console.log('unexpected point reached for login, status is', status)
          this.$navigateTo(Home)
        })
      }
      apiService.doSignup().then(status => {
        console.log('signup finnished, user logged, start editing his account')
        this.isLoading = false
        if (status !== 'ok') return console.log('unexpected point reached for signup, status is', status)
        this.isEditing = true
        this.user = apiService.user
      })
    },
  },
}
</script>
