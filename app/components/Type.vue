<template>
  <StackLayout class="type" :class="[ data.type ]">
     <DockLayout class="type-shadow" stretchLastChild="false">
      <Label class="type-name" :text="data.name" dock="left" />
      <Icon class="type-arrow" name="circled-right-2-white" size="small" dock="right" />
    </DockLayout>
  </StackLayout>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  name: "type",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    Icon
  }
};
</script>

<style lang="scss">
@import "../assets/styles/shared";

.type {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 10 10 0 10;
  &.formula {
    background-image: url("~/assets/images/banners/formula.jpg");
  }
  &.smoothie {
    background-image: url("~/assets/images/banners/smoothie.jpg");
  }
  &.dessert {
    background-image: url("~/assets/images/banners/dessert.jpg");
  }
  &.soup {
    background-image: url("~/assets/images/banners/soup.jpg");
  }
  &.wrap {
    background-image: url("~/assets/images/banners/wrap.jpg");
  }
}
.type-shadow {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10;
  height: 120;
}
.type-name {
  color: $color-primary-alt;
  font-size: $font-size-h1;
  margin-left: 2;
}
.type-arrow {
  vertical-align: bottom;
}
</style>

