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
              <Button class="action" :text="$t('common.back-account')" @tap="$navigateTo(Account)" />
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
import { prettyPrint } from '@/utils'
import Account from '@/pages/account'

export default {
  data () {
    return {
      isLoading: false,
      Account,
      password: '',
      passwordConfirm: '',
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
      if (!this.passwordsMatches()) return apiService.showError('error.passwords-differs')
      this.isLoading = true
      await apiService.updateUserPassword(this.password)
      this.isLoading = false
      apiService.showSuccess('account.password-changed')
      this.$navigateTo(Account)
    },
  },
}
</script>
