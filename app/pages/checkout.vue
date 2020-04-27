<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <WebView :src="html" />
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { $t } from '@/utils'
import pkg from '@/../package.json'

export default {
  props: {
    sessionId: {
      type: String,
      required: true,
    },
  },
  computed: {
    html: function () {
      const hack = '<'
      return `<!DOCTYPE html><head><script src="https://js.stripe.com/v3/">${hack}/script></head><html><body>
        <em>${$t('checkout.loading')}</em><script>var stripe = Stripe("${pkg.config.stripe_pub_key}");
        stripe.redirectToCheckout({ sessionId: "${this.sessionId}" }).then(function (result) {
          // If redirectToCheckout fails due to a browser or network error, display the localized error message to your customer using result.error.message
        })${hack}/script></body></html>`
    },
  },
  created () {
    console.log('Checkout page created with sessionId', this.sessionId)
  },
}
</script>
