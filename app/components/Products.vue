<template>
  <StackLayout>
    <Button v-for="data in items" :key="data.id" :text="data.name" @tap="addProduct(data)" />
  </StackLayout>
</template>

<script>
import { apiService } from '@/services/api-service'

export default {
  data () {
    return {
      items: apiService.items,
    }
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
