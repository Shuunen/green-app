<template>
  <Page>
    <Header />
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout class="p10">
          <Tile :data="{ type: 'wrap', name: data.title }" />
        </StackLayout>
      </ScrollView>
      <Button :class="{ valid }" text="click me" :isEnabled="valid" />
    </FlexboxLayout>
  </Page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Header from '@/components/Header'
import Tile from '@/components/Tile'

export default {
  components: {
    Header,
    Tile,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      valid: false,
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
    }),
  },
  created () {
    console.log('Sample page created')
    this.load()
  },
  methods: {
    ...mapActions(['loadItems']),
    load () {
      this.loadItems()
        .catch(error => console.error(error))
        .then(() => console.log('sample items loaded'))
    },
  },
}
</script>

<style lang="scss">
@import "../assets/styles";
</style>
