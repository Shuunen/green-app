<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <app-header :onHome="true" :user="user" flexShrink="0" />
      <ScrollView orientation="vertical" flexGrow="1">
        <FlexboxLayout class="p-l" flexDirection="column" alignItems="center" justifyContent="space-between">
          <!-- content from here -->
          <StackLayout>
            <Button v-show="user.store" class="action mb-l" :isEnabled="!isLoading" :text="$t('account.change-target')" @tap="$navigateTo(Account)" />
          </StackLayout>
          <app-icon flexGrow="2" class="mt-l mb-l" name="logo-green-is-better-2020" />
          <Button
            class="action big validate mt-l mb-l"
            :isEnabled="!isLoading"
            :text="$t(user.store ? 'order.place' : 'account.set-target')"
            @tap="user.store ? $navigateTo(Formulas) : $navigateTo(Account)"
          />

          <Label v-show="isLoading" :text="$t('common.loading')" class="center fz-s" />
          <ActivityIndicator class="mt-s" :busy="isLoading" />
          <!-- end -->
        </FlexboxLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { apiService } from '@/services'
import { readablePrice } from '@/utils'
import Account from '@/pages/account'
import Checkout from '@/pages/checkout'
import Formulas from '@/pages/formulas'
import PreLogin from '@/pages/pre-login'

export default {
  data () {
    return {
      Account,
      Checkout,
      Formulas,
      isLoading: false,
      readablePrice,
      user: apiService.user,
    }
  },
  mounted () {
    console.log('Home page mounted')
    if (!apiService.isSessionActive()) return this.showErrorAndLogout('error.session-expired')
    if (!apiService.user.store) console.log('user has no store set')
    if (apiService.user.email) return console.log('no need to load user data...')
    this.isLoading = true
    console.log('need to load user & common missing data...')
    apiService.getUserData()
      .then(() => apiService.getCommonData())
      .catch(err => this.showErrorAndLogout(err))
      .then(() => {
        this.user = apiService.user
        this.isLoading = false
      })
  },
  async showErrorAndLogout (err) {
    this.isLoading = false
    apiService.showError(err)
    apiService.doLogout()
    this.$navigateTo(PreLogin)
  },
}
</script>
