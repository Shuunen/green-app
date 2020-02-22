<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <app-header :user="user" />
      <app-tile :data="{ type: 'formula', name: ucfirst($tc('order.formulas', 2)) }" :hero="true" />
      <ScrollView orientation="vertical" flexGrow="1">
        <FlexboxLayout class="p-l" flexDirection="column">
          <!-- content from here -->
          <Label :text="$t('order.choose-formula') + ' :'" class="pt-s pb-m fz-m grey" />
          <app-formula-tile v-for="data in formulas" :key="data.title" :data="data" @tap.native="goto(data)" @tap="goto(data)" />
          <!-- end -->
        </FlexboxLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Formatter from '@/utils/formatter'
import Formula from '@/pages/formula'
import { apiService } from '@/services/api-service'

export default {
  data () {
    return {
      formulas: apiService.formulas,
      isLoading: false,
      user: apiService.user,
    }
  },
  mounted () {
    console.log('Formulas page mounted')
  },
  methods: {
    ucfirst: str => Formatter.capitalizeFirstLetter(str),
    goto (data) {
      console.log('user wants to go to :', data)
      this.$navigateTo(Formula, { props: { data } })
    },
  },
}
</script>
