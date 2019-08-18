<template>
  <Page actionBarHidden="true">
    <RadSideDrawer ref="drawer">
      <Menu ~drawerContent />
      <Frame id="mainContent" ~mainContent>
        <Home />
      </Frame>
    </RadSideDrawer>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex'

import Home from '@/pages/Home'
import Menu from '@/components/Menu'

export default {
  components: {
    Menu,
    Home,
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      toggleMenu: 'toggleMenu',
    }),
  },
  watch: {
    toggleMenu: function () {
      this.$refs.drawer.nativeView.toggleDrawerState()
    },
  },
  created () {
    console.log('Landing created')
  },
}
</script>
