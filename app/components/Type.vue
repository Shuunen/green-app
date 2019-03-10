<template>
  <StackLayout class="type" :class="[ data.type, hero ? 'hero' : '', large ? 'large' : '' ]">
    <FlexboxLayout flexDirection="column" :justifyContent="hero ? 'center' : 'space-between'" class="type-shadow p10">
      <Label class="type-name" :text="data.name" />
      <Icon class="type-arrow" v-if="!hero" name="circled-right-2-white" size="small" alignSelf="flex-end" />
    </FlexboxLayout>
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
    },
    large: Boolean,
    hero: Boolean
  },
  components: {
    Icon
  }
};
</script>

<style lang="scss">
@import "../assets/styles";

.type {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 120;
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
  &.large {
    height: 180;
  }
  &.hero {
    margin: 0;
    .type-name {
      text-align: center;
    }
  }
}
.type-shadow {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
}
.type-name {
  color: $color-primary-alt;
  font-size: $font-size-h1;
  margin-left: 2;
}
</style>

