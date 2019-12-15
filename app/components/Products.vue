<template>
  <StackLayout>
    <Button v-for="data in items" :key="data.id" :text="data.name" @tap="addProduct(data)" />
  </StackLayout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ items: 'items', isLoading: 'isLoading' }),
  },
  created () {
    console.log('Products component created')
  },
  methods: {
    addProduct (data) {
      console.log('user wants to add product :', data.name)
    },
  },
}
</script>
