<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="home p40 bg">
      <Icon
        flexGrow="2"
        class="logo"
        name="logo-green-alt"
      />
      <StackLayout flexGrow="1">
        <Button class="action big validate" :text="$t('order.place')" @tap="order" />
      </StackLayout>
      <Button text="change locale to FR" @tap="$i18n.locale = 'fr'" />
    </FlexboxLayout>
  </Page>
</template>

<script>
import Icon from '@/components/Icon'
import { mapGetters } from 'vuex'
import Formulas from './Formulas.vue'

export default {
  components: {
    Icon
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading'
    })
  },
  created () {
    console.log('Home created')
  },
  methods: {
    order () {
      console.log('user wants to order')
      this.$navigateTo(Formulas, {
        frame: 'mainContent'
      })
    }
  }
}
</script>
