<template>
  <Page>
    <Header />
    <RadSideDrawer ref="drawer">
      <Menu ~drawerContent />
      <Frame
        id="mainContent"
        ~mainContent
      >
        <Home />
      </Frame>
    </RadSideDrawer>
  </Page>
</template>

<script>
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import Home from '@/pages/Home'
import { mapGetters } from 'vuex'

export default {
  components: {
    Header,
    Menu,
    Home
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      toggleMenu: 'toggleMenu'
    })
  },
  watch: {
    toggleMenu: function () {
      this.$refs.drawer.nativeView.toggleDrawerState()
    }
  },
  created () {
    console.log('Landing created')
  }
}
</script>
