<template>
  <Page actionBarHidden="true">
    <ScrollView orientation="vertical">
      <StackLayout class="bg">
        <Tile :data="{ type: 'formula', name: ucfirst($t('order.formula')) }" :hero="true" />
        <StackLayout class="p-m">
          <Label :text="$t('order.choose-formula') + ' :'" class="pt-s pb-m fz-m grey" />
          <FormulaTile v-for="data in formulas" :key="data.title" :data="data" @tap.native="goto(data)" @tap="goto(data)" />
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Formatter from '@/utils/Formatter'
import Formula from '@/pages/Formula'
import FormulaTile from '@/components/FormulaTile'
import Tile from '@/components/Tile'

export default {
  components: {
    Tile,
    FormulaTile,
  },
  computed: {
    ...mapGetters({
      formulas: 'formulas',
      isLoading: 'isLoading',
    }),
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
        props: { data },
      })
    },
  },
}
</script>
