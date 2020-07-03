<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout v-if="hasFailed || hasSucceed">
          <app-header :user="user" />
          <app-tile :data="{ type: 'dessert', name: 'Checkout' }" :hero="true" />
          <StackLayout class="p-m center">
            <Label v-if="hasFailed" :text="$t('checkout.failed')" class="fz-m mt-l pt-l" textWrap="true" />
            <Label v-else :text="$t('checkout.success')" class="fz-m mt-l pt-l" textWrap="true" />
            <FlexboxLayout flexDirection="column" alignItems="center" class="mt-l">
              <Button class="action" :text="$t('common.back-home')" @tap="$navigateTo(Home)" />
            </FlexboxLayout>
          </StackLayout>
        </StackLayout>

        <WebView v-else :src="html" @loadStarted="onLoadStarted" />
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { $t } from '@/utils'
import { apiService } from '@/services'
import Home from '@/pages/home'
import pkg from '@/../package.json'

export default {
  props: {
    sessionId: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      Home,
      hasSucceed: false,
      hasFailed: false,
      user: apiService.user,
    }
  },
  computed: {
    html: function () {
      const hack = '<'
      return `<!DOCTYPE html><head><script src="https://js.stripe.com/v3/">${hack}/script></head><html><body>
        <em>${$t('checkout.loading')}</em><script>var stripe = Stripe("${pkg.config.stripe_pub_key}");
        stripe.redirectToCheckout({ sessionId: "${this.sessionId}" }).then(function (result) {
          // If redirectToCheckout fails due to a browser or network error, display the localized error message to your customer using result.error.message
        });${hack}/script></body></html>`
    },
  },
  created () {
    console.log('Checkout page created with sessionId', this.sessionId)
  },
  methods: {
    onLoadStarted (event) {
      const { url = '' } = event
      console.log('navigation detected with destination :', url)
      if (url.includes('file:') || url.includes('checkout.stripe.com/pay')) return console.log('allowed navigation, no prevent')
      if (url.includes('/cancel')) return this.$navigateTo(Home)
      if (url.includes('/success')) return (this.hasSucceed = true)
      console.log('un-handled navigation case ?!')
      // this.hasFailed = true
      // todo il y a surement un moyen de faire plus clean
    },
  },
}
</script>
