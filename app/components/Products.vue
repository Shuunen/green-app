<template>
  <StackLayout>
    <Button v-for="data in items" :key="data.id" :text="data.name" @tap="addProduct(data)" />
  </StackLayout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      listLoaded: false,
    }
  },
  computed: {
    ...mapGetters({
      items: 'items',
      isLoading: 'isLoading',
    }),
  },
  created () {
    console.log('Products component created')
    this.load()
  },
  methods: {
    ...mapActions(['loadItems']),
    load () {
      this.loadItems()
        .catch(error => {
          console.error(error)
          alert('An error occurred loading item list.')
        })
        .then(() => (this.listLoaded = true))
    },
    addProduct (data) {
      console.log('user wants to add product :', data.name)
    },
  },
}
</script>
