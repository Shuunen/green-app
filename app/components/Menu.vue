<template>
  <StackLayout  backgroundColor="#ffffff">
    <Label class="drawer-header" text="Drawer"/>
    <Label class="drawer-item" text="Menus"/>
    <Label class="drawer-item" text="My account"/>
    <Label class="drawer-item" text="Logout" @tap="doLogout"/>
  </StackLayout>
</template>

<style>
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
