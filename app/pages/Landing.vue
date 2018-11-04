<template>
    <Page>
        <Header />
        <RadSideDrawer ref="drawer">
            <Menu ~drawerContent />
            <Products ~mainContent />
        </RadSideDrawer>
    </Page>
</template>

<script>
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Products from "@/components/Products";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  components: {
    Header,
    Menu,
    Products
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
