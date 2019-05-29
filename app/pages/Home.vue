<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="home pt20 pb40 pl40 pr40 bg">
      <StackLayout flexGrow="1">
        <Button class="action" :text="$t('account.change-target')" @tap="goAccount" />
      </StackLayout>
      <Icon flexGrow="2" class="logo" name="logo-green-alt" />
      <StackLayout flexGrow="1">
        <Button class="action big validate mb20" :text="$t('order.place')" @tap="startOrder" />
      </StackLayout>
      <LangSelector />
    </FlexboxLayout>
  </Page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Icon from '@/components/Icon'
import LangSelector from '@/components/LangSelector'

export default {
  components: { Icon, LangSelector },
  computed: {
    ...mapGetters({ isLoading: 'isLoading' })
  },
  mounted () {
    console.log('Home page mounted')
  },
  methods: {
    ...mapActions(['goAccount', 'startOrder'])
  }
}
</script>
