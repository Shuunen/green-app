<template>
  <Page actionBarHidden="true">
    <ScrollView orientation="vertical">
      <FlexboxLayout flexDirection="column" justifyContent="space-between" class="p10">
        <Type :data="data" :hero="true"/>
        <Product v-for="data in typeList" :key="data.id" :data="data"/>
        <Label
          class="center"
          v-show="!typeList.length"
          :text="`Sorry we do not have any ${data.type} yet.`"
        />
        <Button class="mt10" text="Back to home" @tap="goBack"/>
      </FlexboxLayout>
    </ScrollView>
  </Page>
</template>

<script>
import Product from "@/components/Product";
import Type from "@/components/Type";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  components: { Product, Type },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      listLoaded: false,
      typeList: []
    };
  },
  computed: {
    ...mapGetters({
      productList: "productList",
      isLoading: "isLoading"
    })
  },
  mounted() {
    console.log("Type details page mounted");
    this.typeList = this.productList.filter(p => p.type === this.data.type);
    console.log(
      `and ${this.typeList.length} products of type ${this.data.type}`
    );
  },
  methods: {
    goBack() {
      this.$navigateBack({ frame: "mainContent" });
    },
    addProduct(data) {
      console.log("user wants to add product :", data.name);
    }
  }
};
</script>
