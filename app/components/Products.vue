<template>
        <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="Welcome to Green !"  col="1"/>
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#ffffff">
                <Label class="drawer-header" text="Drawer"/>

                <Label class="drawer-item" text="Menus"/>
                <Label class="drawer-item" text="My account"/>
                <Label class="drawer-item" text="Logout" @tap="doLogout"/>
            </StackLayout>

            <GridLayout ~mainContent rows="*, *" columns="*" @loaded="load()">
                <Label class="message" :text="productListLine" row="0" />
                <StackLayout row="1">
                  <Button :text="data.name" v-for="data in products" :key="data.id" @tap="addProduct(data)" />
                </StackLayout>
            </GridLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
import store from "../store";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      listLoaded: false
    };
  },
  computed: {
    ...mapGetters({
      productList: "productList",
      isLoading: "isProcessing"
    }),
    products: function() {
      return this.productList;
    },
    productListLine() {
      return "Here is our products : ";
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

.title {
  text-align: left;
  padding-left: 16;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}

.drawer-header {
  padding: 50 16 16 16;
  margin-bottom: 16;
  background-color: #53ba82;
  color: #ffffff;
  font-size: 24;
}

.drawer-item {
  padding: 8 16;
  color: #333333;
  font-size: 16;
}
</style>
