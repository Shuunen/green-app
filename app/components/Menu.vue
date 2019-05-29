<template>
  <FlexboxLayout flexDirection="column" class="bg">
    <StackLayout flexGrow="1">
      <Label class="alt-bg white pt50 pb15 pl15 fz25" :text="user.firstName" @tap="goAccount" />
      <StackLayout class="p15">
        <Label :text="$t('common.home')" class="mb10" @tap="goHome" />
        <Label :text="$t('common.my-account')" class="mb10" @tap="goAccount" />
        <Label :text="$t('common.my-orders')" class="mb10" @tap="goOrders" />
        <Label :text="$t('common.logout')" class="mb10" @tap="doLogout" />
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
    ...mapGetters({
      isLoading: 'isLoading',
      user: 'user',
    }),
  },
  methods: {
    ...mapActions(['doLogout', 'goAccount', 'goOrders', 'goHome']),
  },
}
</script>
