<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <FlexboxLayout flexDirection="column">
          <!-- content from here -->
          <app-tile :data="{ type: 'smoothie', name: $t('account.my-password') }" :hero="false" />

          <StackLayout class="p-l">
            <!-- help/explaining message -->
            <Label class="black fz-m" :text="$t('account.change-password-message')" textWrap="true" />

            <StackLayout class="input-field mt-l">
              <Label class="black" :text="$t('account.email')" />
              <TextField v-model="user.email" :isEnabled="false" />
            </StackLayout>

            <StackLayout class="input-field mt-l">
              <Label class="black" :text="$t('account.new-password')" />
              <!-- TODO https://github.com/Shuunen/green-app/issues/125 reveal password -->
              <TextField v-model="password" secure="true" autocorrect="false" autocapitalizationType="none" returnKeyType="next" />
            </StackLayout>

            <StackLayout class="input-field mt-l">
              <Label class="black" :text="$t('account.new-password-confirm')" />
              <!-- TODO https://github.com/Shuunen/green-app/issues/125 reveal password -->
              <TextField v-model="passwordConfirm" secure="true" autocorrect="false" autocapitalizationType="none" returnKeyType="done" />
            </StackLayout>
            <!-- action button -->
            <FlexboxLayout flexDirection="column" flexGrow="1" alignItems="center" class="p-l mt-l">
              <Button class="action validate" :isEnabled="(password.length > 0 && passwordConfirm.length > 0)" :text="$t('account.change-password')" @tap="submit" />
              <Button v-if="isSessionActive" class="action" :text="$t('common.back-account')" @tap="$navigateTo(Account)" />
              <Button v-else class="action" :text="$t('common.back-home')" @tap="$navigateTo(PreLogin)" />
            </FlexboxLayout>
          </StackLayout>
          <!-- end -->
        </FlexboxLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { apiService } from '@/services'
import { prettyPrint, showError, showSuccess } from '@/utils'
import Account from '@/pages/account'
import PreLogin from '@/pages/pre-login'

export default {
  props: {
    token: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      Account,
      isLoading: false,
      isSessionActive: apiService.isSessionActive(),
      password: '',
      passwordConfirm: '',
      PreLogin,
      user: apiService.user,
    }
  },
  mounted () {
    console.log('Change pass page mounted with user', prettyPrint(this.user))
  },
  methods: {
    passwordsMatches () {
      return this.password === this.passwordConfirm
    },
    async submit () {
      console.log(`change pass : user submitted "${this.password}"`)
      if (!this.passwordsMatches()) return showError('error.passwords-differs')
      this.isLoading = true
      const status = await this.updateUserPassword()
      this.isLoading = false
      if (status.ok) showSuccess('account.password-changed')
      this.$navigateTo(Account)
    },
    async updateUserPassword () {
      if (this.token.length === 0) return apiService.updateUserPassword(this.password)
      // if token defined, it means user came here from : forgot password -> email link
      const content = { password: this.password, token: this.token }
      console.log('need to send this to API', content)
      // TODO
      showError('error.api-needed')
    },
  },
}
</script>
