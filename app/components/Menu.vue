<template>
  <FlexboxLayout flexDirection="column" class="bg">
    <StackLayout flexGrow="1">
      <Label class="alt-bg white pt-l pb-m pl-m fz-l" :text="user.firstName" @tap="goAccount" />
      <StackLayout class="p-m">
        <Label :text="$t('common.home')" class="mb-m" @tap="goHome" />
        <Label :text="$t('common.my-account')" class="mb-m" @tap="goAccount" />
        <Label :text="$t('common.my-orders')" class="mb-m" @tap="goOrders" />
        <Label :text="$t('common.logout')" class="mb-m" @tap="doLogout" />
      </StackLayout>
    </StackLayout>
    <LangSelector />
    <Version />
  </FlexboxLayout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import LangSelector from '@/components/LangSelector'
import Version from '@/components/Version'

export default {
  components: { LangSelector, Version },
  computed: {
    ...mapGetters({ isLoading: 'isLoading', user: 'user' }),
  },
  methods: {
    ...mapActions(['doLogout', 'goAccount', 'goOrders', 'goHome']),
  },
}
</script>
