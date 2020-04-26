<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <WebView src="~/pages/stripe.html" />
        <!--
        <StackLayout>
          <app-header :user="user" />
          <app-tile :data="{ type: 'dessert', name: 'Checkout' }" :hero="true" />
          <StackLayout class="p-m center">
            <Label text="You need to pay :" class="fz-m mt-l pt-l" />
            <Label :text="readablePrice(32.40)" class="fz-l mt-m mb-l" />
            <FlexboxLayout flexDirection="column" alignItems="center" class="mt-l">
              <Button class="action big validate" :text="$t('order.pay', { amount : readablePrice(32.40) })" @tap="pay()" />
            </FlexboxLayout>
          </StackLayout>
        </StackLayout>
        -->
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
export default {
  created () {
    console.log('Checkout page created')
  },
}
</script>
