<template>
  <Page actionBarHidden="true">
    <ScrollView orientation="vertical">
      <StackLayout class="pb10">
        <Tile
          v-for="(data, index) in tiles"
          :key="data.type"
          :data="data"
          :large="index === 0"
          @tap.native="goto(data)"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import Tile from '@/components/Tile'
import { mapGetters, mapActions } from 'vuex'
import Formulas from './Formulas.vue'
// import TileDetails from '@/pages/TileDetails'

export default {
  components: {
    Tile
  },
  data () {
    return {
      listLoaded: false
    }
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
        .then(() => {
          this.listLoaded = true
          // this.gotoFirst()
        })
    },
    gotoFirst () {
      setTimeout(() => console.log('\n\nPLEASE REMOVE ME ^^ '), 1000)
      this.goto(this.tiles[0])
      /*
      this.$navigateTo(Formulas, {
        frame: 'mainContent',
        props: { data: this.tiles[0] }
      })
      */
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
