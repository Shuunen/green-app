<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <app-header :user="user" />
      <app-tile :data="{ type: 'formula', name: capitalizeFirstLetter($tc('order.formulas', 2)) }" flexShrink="0" :hero="true" />
      <ScrollView orientation="vertical" flexGrow="1">
        <FlexboxLayout class="p-l" flexDirection="column">
          <!-- content from here -->
          <Label v-show="!isLoading" :text="menus.length === 0 ? $t('order.no-formulas') : $tc('order.choose-formula', orders.length)" class="pt-s pb-m fz-m grey" textWrap="true" />
          <app-formula-tile v-for="menu in menus" :key="menu.title" :data="menu" @tap.native="goto(menu)" @tap="goto(menu)" />
          <!-- action button -->
          <FlexboxLayout flexDirection="column" flexGrow="1" alignItems="center" class="p-l mt-l">
            <Button v-show="!isLoading && !menus.length" class="action validate mb-l" :text="$t('account.change-target')" @tap="$navigateTo(Account)" />
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
import { capitalizeFirstLetter, prettyPrint } from '@/utils'
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
      menus: [],
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
      const { id, menus } = this.user.store
      console.log(`found ${menus.length} menus in the user store with id "${id}"`)
      this.menus = menus.filter(menu => menu.active)
    },
    goto (data) {
      console.log('user wants to go to :', prettyPrint(data))
      this.$navigateTo(Formula, { props: { data, orders: this.orders } })
    },
  },
}
</script>
