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
      <LangSelector />
    </FlexboxLayout>
  </Page>
</template>

<script>
import LangSelector from '@/components/LangSelector'
import Icon from '@/components/Icon'
import { mapGetters } from 'vuex'
import Formulas from './Formulas.vue'

export default {
  components: {
    Icon,
    LangSelector
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading'
    })
  },
  mounted () {
    console.log('Home page mounted')
    // setTimeout(() => this.order(), 100)
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
