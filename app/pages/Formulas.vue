<template>
  <Page actionBarHidden="true">
    <ScrollView orientation="vertical">
      <StackLayout class="p10 bg">
        <Tile
          :data="{
            type: 'formula',
            name: ucfirst($t('order.formula'))
          }"
          :hero="true"
        />
        <Label :text="$t('order.choose-formula') + ' :'" class="pv15 fz20 grey" />
        <FormulaTile
          v-for="data in formulas"
          :key="data.title"
          :data="data"
          @tap.native="goto(data)"
          @tap="goto(data)"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import Tile from '@/components/Tile'
import Formatter from '@/utils/Formatter'
import { mapGetters, mapActions } from 'vuex'
import FormulaTile from '@/components/FormulaTile'
import Formula from '@/pages/Formula'

export default {
  components: {
    Tile,
    FormulaTile
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
      this.loadFormulas().catch(error => {
        console.error(error)
        alert('An error occurred loading formulas.')
      })
      // .then(() => this.goto(this.formulas[1]))
    },
    ucfirst: str => Formatter.capitalizeFirstLetter(str),
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
