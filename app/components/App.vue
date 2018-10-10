<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="Welcome to NativeScript-Vue!"  col="1"/>
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#ffffff">
                <Label class="drawer-header" text="Drawer"/>

                <Label class="drawer-item" text="Item 1"/>
                <Label class="drawer-item" text="Item 2"/>
                <Label class="drawer-item" text="Item 3"/>
            </StackLayout>

            <GridLayout ~mainContent rows="*, auto" columns="*">
                <Label class="message" :text="helloMsg" row="0" />
                <Button @tap="toggleLogin" :text="loginBtn" row="1" />
            </GridLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
import store from '../store'

export default {
  data() {
    return {
      plop: false
    };
  },
  computed: {
    helloMsg() {
      return "Hello " + (store.state.isLoggedIn ? 'Romain' : 'Anon') + ' !'
    },
    loginBtn() {
      return store.state.isLoggedIn ? 'Logout' : 'Login'
    },
  },
  methods: {
    toggleLogin() {
      if (store.state.isLoggedIn) {
        store.commit('doLogout')
      } else {
        store.commit('doLogin')
      }
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
