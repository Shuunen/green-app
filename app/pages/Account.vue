<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout class="p10">
          <Tile :data="{ type: 'formula', name: 'Account Page' }" :hero="true" />
        </StackLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Tile from '@/components/Tile'
import { mapGetters } from 'vuex'

export default {
  components: {
    Tile
  },
  data () {
    return {
      user: {
        firstname: 'Benjamin',
        lastname: 'Franklin'
      }
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading'
    })
  },
  created () {
    console.log('Account page created')
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import "../assets/styles";
</style>
