<template>
  <StackLayout class="type" :class="[ data.type, hero ? 'hero' : '', large ? 'large' : '' ]">
    <FlexboxLayout flexDirection="column" :justifyContent="hero ? 'center' : 'space-between'" class="type-shadow p-m">
      <Label class="type-name fz-l" :text="data.name" />
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    large: Boolean,
    hero: Boolean,
  },
}
</script>

<style>
@import url("../assets/styles");

.type {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 10 10 0 10;
}
.type-shadow {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
}
.type-name {
  color: var(--color-white);
  margin-left: 2;
}
.type.formula {
  background-image: url("~/assets/images/banners/formula.jpg");
}
.type.smoothie {
  background-image: url("~/assets/images/banners/smoothie.jpg");
}
.type.dessert {
  background-image: url("~/assets/images/banners/dessert.jpg");
}
.type.soup {
  background-image: url("~/assets/images/banners/soup.jpg");
}
.type.wrap {
  background-image: url("~/assets/images/banners/wrap.jpg");
}
.type.large {
  height: 180;
}
.type.hero {
  height: 120;
  margin: 0;
}
.type.hero .type-name {
  text-align: center;
}
</style>
