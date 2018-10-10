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

            <GridLayout ~mainContent rows="*" columns="*">
                <Label class="message" :text="productListLine" row="0" />
            </GridLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
import store from '../store'

export default {
  data() {
    return {
      productList: ['one','two','three']
    };
  },
  computed: {
    productListLine() {
      return 'Here is our products : ' + this.productList.join(', ')
    },
  },
  methods: {
    doLogout() {
      store.commit('doLogout')
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
