<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout>
          <app-header :user="user" />
          <app-tile :data="{ type: 'dessert', name: 'Checkout' }" :hero="true" />
          <StackLayout class="p-m center">
            <CreditCardView ref="ccView" class="mt-l" />
            <FlexboxLayout flexDirection="column" alignItems="center" class="mt-l">
              <Button class="action big validate" :text="$t('order.pay', { amount : readablePrice(32.40) })" @tap="pay()" />
            </FlexboxLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { readablePrice } from '@/utils'
import { apiService } from '@/services'

export default {
  data () {
    return {
      readablePrice,
      isLoading: false,
      user: apiService.user,
    }
  },
  created () {
    console.log('Checkout page created')
  },
  methods: {
    pay () {
      console.log('user wanna pay')
    },
  },
}
</script>
