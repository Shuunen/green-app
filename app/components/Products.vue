<template>
  <StackLayout>
    <Button
      v-for="data in productList"
      :key="data.id"
      :text="data.name"
      @tap="addProduct(data)"
    />
  </StackLayout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      listLoaded: false
    }
  },
  computed: {
    ...mapGetters({
      productList: 'productList',
      isLoading: 'isLoading'
    })
  },
  created () {
    console.log('Products created')
    this.load()
  },
  methods: {
    ...mapActions(['loadProducts']),
    load () {
      this.loadProducts()
        .catch(error => {
          console.error(error)
          alert('An error occurred loading products list.')
        })
        .then(() => (this.listLoaded = true))
    },
    addProduct (data) {
      console.log('user wants to add product :', data.name)
    }
  }
}
</script>
