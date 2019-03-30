<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="home pb10 bg">
      <Icon
        flexGrow="1"
        class="logo m20"
        name="logo-green-alt"
        size="h100"
      />
      <Tile
        v-for="tile in tiles"
        :key="tile.type"
        :data="tile"
        :large="true"
        @tap.native="goto(tile)"
      />
    </FlexboxLayout>
  </Page>
</template>

<script>
import Icon from '@/components/Icon'
import Tile from '@/components/Tile'
import { mapGetters, mapActions } from 'vuex'
import Formulas from './Formulas.vue'

export default {
  components: {
    Icon,
    Tile
  },
  computed: {
    ...mapGetters({
      tiles: 'tiles',
      isLoading: 'isLoading'
    })
  },
  created () {
    console.log('Home created')
    this.load()
  },
  methods: {
    ...mapActions(['loadTiles']),
    load () {
      this.loadTiles()
        .catch(error => {
          console.error(error)
          alert('An error occurred loading tiles.')
        })
        // .then(() => this.goto(this.tiles[0]))
    },
    goto (data) {
      console.log('user wants to go to :', data.type)
      if (data.type === 'formula') {
        this.$navigateTo(Formulas, {
          frame: 'mainContent',
          props: { data }
        })
      } else {
        console.error(`type "${data.type}" not handled yet`)
      }
    }
  }
}
</script>
