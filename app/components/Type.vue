<template>
  <StackLayout class="type">
     <DockLayout class="type-shadow" stretchLastChild="false">
      <Label class="type-name" :text="data.name" dock="left" />
      <Icon class="type-arrow" name="circled-right-2-white" dock="right" />
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
  background-image: url("~/assets/images/formulas.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 10 10 0 10;
}
.type-shadow {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10;
  height: 120;
}
.type-name {
  color: $color-primary-alt;
}
.type-arrow {
  vertical-align: bottom;
}
</style>

