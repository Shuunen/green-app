<template>
    <Page>
        <Header />
        <RadSideDrawer ref="drawer">
            <Menu ~drawerContent />
            <Types ~mainContent />
        </RadSideDrawer>
    </Page>
</template>

<script>
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Types from "@/components/Types";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  components: {
    Header,
    Menu,
    Types
  },
  watch: {
    toggleMenu: function() {
      this.$refs.drawer.nativeView.toggleDrawerState();
    }
  },
  computed: {
    ...mapGetters({
      toggleMenu: "toggleMenu",
      isLoading: "isLoading"
    })
  },
  mounted() {
    console.log("Landing mounted");
  }
};
</script>
