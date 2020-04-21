<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <app-header :user="user" />
      <app-tile :data="{ type: 'formula', name: capitalizeFirstLetter($tc('order.formulas', 2)) }" :hero="true" />
      <ScrollView orientation="vertical" flexGrow="1">
        <FlexboxLayout class="p-l" flexDirection="column">
          <!-- content from here -->
          <Label v-show="!isLoading" :text="formulas.length ? $tc('order.choose-formula', orders.length) : $t('order.no-formulas')" class="pt-s pb-m fz-m grey" textWrap="true" />
          <app-formula-tile v-for="data in formulas" :key="data.title" :data="data" @tap.native="goto(data)" @tap="goto(data)" />
          <!-- action button -->
          <FlexboxLayout flexDirection="column" flexGrow="1" alignItems="center" class="p-l mt-l">
            <Button v-show="!isLoading && !formulas.length" class="action validate mb-l" :text="$t('account.change-target')" @tap="$navigateTo(Account)" />
            <Button class="action" :text="$t('common.back-home')" @tap="$navigateTo(Home)" />
          </FlexboxLayout>
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
import { capitalizeFirstLetter } from '@/utils'
import Account from '@/pages/account'
import Formula from '@/pages/formula'
import Home from '@/pages/home'

export default {
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      Account,
      Home,
      capitalizeFirstLetter,
      formulas: [],
      isLoading: false,
      stores: apiService.stores,
      user: apiService.user,
    }
  },
  mounted () {
    console.log('Formulas page mounted')
    this.loadMenus()
  },
  methods: {
    loadMenus () {
      const store = this.stores.find(s => s.id === this.user.store)
      if (!store) {
        this.isLoading = false
        return console.error('cannot find the user store from stores list')
      }
      console.log(`here is the menus form store "${store.name}" :`, store.menus)
      // this.formulas = menus // not ready yet
    },
    goto (data) {
      console.log('user wants to go to :', data)
      this.$navigateTo(Formula, { props: { data, orders: this.orders } })
    },
  },
}
</script>
