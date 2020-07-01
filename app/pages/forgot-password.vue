<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="p-l bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <FlexboxLayout flexDirection="column">
          <!-- content from here -->
          <app-icon class="mt-l mb-l" height="70" name="logo-green-is-better-2020" />

          <Label :text="$t('login.forgot-password')" class="fz-m mt-l mb-l black" textWrap="true" />

          <!-- help/explaining message -->
          <Label :text="$t('login.forgot-password-message')" class="fz-s mb-l black" textWrap="true" />

          <StackLayout class="input-field mt-l">
            <Label class="black" :text="$t('account.email')" />
            <TextField v-model="user.email" :hint="$t('account.email')" keyboardType="email" returnKeyType="done" :isEnabled="!isLoading" autocorrect="false" autocapitalizationType="none" />
          </StackLayout>

          <!-- action button -->
          <FlexboxLayout flexDirection="column" flexGrow="1" alignItems="center" class="p-l mt-l">
            <Button class="action validate" :isEnabled="user.email.length > 0" :text="$t('login.reset-password')" @tap="submit" />
            <Button class="action" :text="$t('common.back')" @tap="$navigateTo(Login)" />
          </FlexboxLayout>

          <!-- end -->
        </FlexboxLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { apiService, httpService } from '@/services'
import { showError, showSuccess } from '@/utils'
import Login from '@/pages/login'
import PreLogin from '@/pages/pre-login'

export default {
  data () {
    return {
      isLoading: false,
      Login,
      user: apiService.user,
    }
  },
  mounted () {
    console.log(`Forgot pass page mounted with user email "${this.user.email}"`)
  },
  methods: {
    async submit () {
      console.log(`forgot pass : user submitted "${this.user.email}"`)
      if (!this.user.hasValidEmail) return showError('error.invalid-email')
      this.isLoading = true
      const status = await httpService.get(`/forgot-password?email=${this.user.email}`)
      this.isLoading = false
      if (status.ok) showSuccess('login.reset-mail-sent')
      this.$navigateTo(PreLogin)
    },
  },
}
</script>
