<template>
  <ActionBar>
    <GridLayout columns="auto, *, auto, 15">
      <Icon
        name="menu-white"
        col="0"
        @tap.native="toggleMenu"
      />
      <Label
        class="store fz20"
        text="Green La Beaujoire (44)"
        col="1"
      />
      <Icon
        name="location-white"
        col="2"
      />
      <Label col="3" />
    </GridLayout>
  </ActionBar>
</template>

<script>
import Icon from '@/components/Icon'
import { mapActions } from 'vuex'

export default {
  components: {
    Icon
  },
  methods: {
    ...mapActions(['toggleMenu'])
  }
}
</script>

<style lang="scss">
@import "../assets/styles";

ActionBar {
  background-color: $color-primary;
  color: $color-white;
}

.store {
  vertical-align: center;
  text-align: center;
  font-weight: bold;
}
</style>
