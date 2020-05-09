<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="p-l bg">
      <StackLayout flexGrow="1" />
      <app-icon class="mb-l" height="70" name="logo-green-alt" />
      <StackLayout flexGrow="1">
        <Label :text="$t('pre-login.welcome')" class="fz-m mt-l mb-l black" textWrap="true" />
        <FlexboxLayout flexDirection="column" justifyContent="center">
          <Label :text="$t('pre-login.has-account')" class="fz-s center" />
          <Button class="action big validate" :text="$t('pre-login.login')" @tap="submit(true)" />
          <Label :text="$t('pre-login.no-account')" class="fz-s center mt-l" />
          <Button class="action big validate-alt" :text="$t('pre-login.sign-up')" @tap="submit(false)" />
        </FlexboxLayout>
      </StackLayout>
      <app-lang-selector />
    </FlexboxLayout>
  </Page>
</template>

<script>
import Login from '@/pages/login'

export default {
  mounted () {
    console.log('Pre-login page mounted')
  },
  methods: {
    async submit (hasAccount) {
      console.log('Pre-login : submit, user wants to', hasAccount ? 'login' : 'sign-up')
      this.$navigateTo(Login, { props: { hasAccount } })
    },
  },
}
</script>
