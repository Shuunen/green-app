<template>
  <Page actionBarHidden="true">
    <ScrollView orientation="vertical">
      <StackLayout class="formulas pb10">
        <Tile
          :data="{
            type: 'formula',
            name: 'Formulas'
          }"
          :hero="true"
        />
        <FlexboxLayout flexWrap="wrap" justifyContent="center" class="p10">
          <Label class="pt10 pb15 fz20" text="Choose your formula :" width="100%" />
          <FormulaTile
            v-for="(data, index) in formulas"
            :key="data.title"
            :flexGrow="index < formulas.length - 1 ? 1 : 0"
            :data="data"
            @tap.native="goto(data)"
          />
        </FlexboxLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import Tile from '@/components/Tile'
import { mapGetters, mapActions } from 'vuex'
import FormulaTile from '@/components/FormulaTile'
import Formula from '@/pages/Formula'

export default {
  components: {
    Tile,
    FormulaTile
  },
  data () {
    return {
      listLoaded: false
    }
  },
  computed: {
    ...mapGetters({
      formulas: 'formulas',
      isLoading: 'isLoading'
    })
  },
  created () {
    console.log('Formulas page created')
    this.load()
  },
  methods: {
    ...mapActions(['loadFormulas']),
    load () {
      this.loadFormulas()
        .catch(error => {
          console.error(error)
          alert('An error occurred loading formulas.')
        })
        .then(() => {
          this.listLoaded = true
          this.gotoFirstFormula()
        })
    },
    gotoFirstFormula () {
      setTimeout(() => console.log('\n\nPLEASE REMOVE ME ^^ '), 1000)
      this.goto(this.formulas[0])
    },
    goto (data) {
      console.log('user wants to go to :', data)
      this.$navigateTo(Formula, {
        frame: 'mainContent',
        props: { data }
      })
    }
  }
}
</script>
