<template>
    <Page>
        <Header />
        <RadSideDrawer ref="drawer">
            <Menu ~drawerContent />
            <StackLayout ~mainContent @loaded="load()">
                <label class="app-subtitle" text="Online Order" />
                <Label class="app-message" textWrap="true" text="Add products to your basket, when you're done click on the shopping cart on the top right corner." />
                <Button :text="data.name" v-for="data in productList" :key="data.id" @tap="addProduct(data)"></Button>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
import store from "@/store";
import Icon from "@/components/Icon";
import Menu from "@/components/Menu";
import Header from "@/components/Header";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  components: {
    Icon,
    Menu,
    Header
  },
  data() {
    return {
      listLoaded: false,
      cartCount: 0
    };
  },
  watch: {
    toggleMenu: function() {
      this.$refs.drawer.nativeView.toggleDrawerState()
    }
  },
  computed: {
    ...mapGetters({
      productList: "productList",
      toggleMenu: "toggleMenu",
      isLoading: "isLoading"
    })
  },
  mounted() {
    console.log("Products mounted");
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
    },
    addProduct(data) {
      console.log("user wants to add product :", data.name);
      this.cartCount++;
    }
  }
};
</script>

<style scoped>
.app-subtitle {
  vertical-align: center;
  text-align: center;
  font-size: 30;
  color: #333333;
  margin-top: 10;
  margin-bottom: 25;
}

.app-message {
  vertical-align: center;
  font-size: 15;
  color: #333333;
  margin-bottom: 10;
  margin-left: 3;
}
</style>
