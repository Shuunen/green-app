<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *, auto">
                <Label class="menu" text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="Welcome to Green !" col="1" />
                <Icon class="cart" name="shopping-cart-white" :number="3" col="2" />
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <Menu ~drawerContent />
            <StackLayout ~mainContent @loaded="load()">
                <Icon class="app-logo" name="logo" size="210x80" />
                <label class="app-subtitle" text="Online Order" />
                <Label class="app-message" textWrap="true" text="Add products to your basket, when you're done click on the shopping cart on the top right corner." />
                <Button :text="data.name" v-for="data in products" :key="data.id" @tap="addProduct(data)"></Button>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
import store from "../store";
import Icon from "@/components/Icon";
import Menu from "@/components/Menu";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  components: {
    Icon,
    Menu
  },
  data() {
    return {
      listLoaded: false,
      cartCount: 0
    };
  },
  computed: {
    ...mapGetters({
      productList: "productList",
      isLoading: "isProcessing"
    }),
    products: function() {
      return this.productList;
    }
  },
  mounted() {
    console.log("Products mounted");
  },
  methods: {
    ...mapActions(["loadProducts"]),
    load() {
      this.loadProducts()
        .then(() => {
          this.listLoaded = true;
        })
        .catch(error => {
          console.error(error);
          alert("An error occurred loading products list.");
        });
    },
    addProduct(data) {
      console.log("user wants to add product :", data.name);
      this.cartCount++;
    },
    doLogout() {
      store.commit("doLogout");
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

.menu {
  vertical-align: center;
}

.title {
  vertical-align: center;
  text-align: left;
  padding-left: 16;
}

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

.cart {
  margin-right: 16;
}
</style>
