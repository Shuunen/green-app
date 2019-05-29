<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout class="p10">
          <Tile :data="{ type: 'soup', name: $t('order.my-orders') }" :hero="true" />
        </StackLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex'

import Tile from '@/components/Tile'

export default {
  components: {
    Tile,
  },
  data () {
    return {
      orders: [
        {
          id: 1,
          date: '14/05/2019',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
    }),
  },
  created () {
    console.log('Orders page created')
  },
  methods: {
  },
}
</script>

<style lang="scss">
@import "../assets/styles";
</style>
