<template>
  <Page actionBarHidden="true">
    <ScrollView orientation="vertical">
      <StackLayout class="bg">
        <Tile :data="{ type: 'formula', name: ucfirst($tc('order.formulas', 2)) }" :hero="true" />
        <StackLayout class="p-m">
          <Label :text="$t('order.choose-formula') + ' :'" class="pt-s pb-m fz-m grey" />
          <FormulaTile v-for="data in formulas" :key="data.title" :data="data" @tap.native="goto(data)" @tap="goto(data)" />
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex'

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
    ...mapGetters({ formulas: 'formulas', isLoading: 'isLoading' }),
  },
  created () {
    console.log('Formulas page created')
  },
  methods: {
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
