<template>
  <Page actionBarHidden="true">
    <ScrollView orientation="vertical">
      <FlexboxLayout
        flexDirection="column"
        justifyContent="space-between"
        class="p10"
      >
        <Type
          :data="data"
          :hero="true"
        />
        <Product
          v-for="type in typeList"
          :key="type.id"
          :data="type"
        />
        <Label
          v-show="!typeList.length"
          class="center"
          :text="`Sorry we do not have any ${data.type} yet.`"
        />
        <Button
          class="mt10"
          text="Back to home"
          @tap="goBack"
        />
      </FlexboxLayout>
    </ScrollView>
  </Page>
</template>

<script>
import Product from '@/components/Product'
import Type from '@/components/Type'
import { mapGetters } from 'vuex'

export default {
  components: { Product, Type },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      listLoaded: false,
      typeList: []
    }
  },
  computed: {
    ...mapGetters({
      productList: 'productList',
      isLoading: 'isLoading'
    })
  },
  mounted () {
    console.log('Type details page mounted')
    this.typeList = this.productList.filter(p => p.type === this.data.type)
    console.log(
      `and ${this.typeList.length} products of type ${this.data.type}`
    )
  },
  methods: {
    goBack () {
      this.$navigateBack({ frame: 'mainContent' })
    },
    addProduct (data) {
      console.log('user wants to add product :', data.name)
    }
  }
}
</script>
