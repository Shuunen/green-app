<template>
  <Page>
    <Header/>
    <RadSideDrawer ref="drawer">
      <Menu ~drawerContent/>
      <Frame ~mainContent id="mainContent">
        <Types/>
      </Frame>
    </RadSideDrawer>
  </Page>
</template>

<script>
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Types from "@/pages/Types";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  components: {
    Header,
    Menu,
    Types
  },
  data() {
    return {
      listLoaded: false
    };
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
  created() {
    console.log("Landing created");
    this.load();
  },
  methods: {
    ...mapActions(["loadProducts"]),
    load() {
      this.loadProducts()
        .catch(error => {
          console.error(error);
          alert("An error occurred loading products list.");
        })
        .then(() => (this.listLoaded = true));
    }
  }
};
</script>
