<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <app-header :user="user" />
      <app-tile :data="{ type: 'formula', name: capitalizeFirstLetter($tc('order.formulas', 2)) }" :hero="true" />
      <ScrollView orientation="vertical" flexGrow="1">
        <FlexboxLayout class="p-l" flexDirection="column">
          <!-- content from here -->
          <Label :text="$tc('order.choose-formula', orders.length) + ' :'" class="pt-s pb-m fz-m grey" />
          <app-formula-tile v-for="data in formulas" :key="data.title" :data="data" @tap.native="goto(data)" @tap="goto(data)" />
          <!-- end -->
        </FlexboxLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { apiService } from '@/services'
import { capitalizeFirstLetter } from '@/utils'
import Formula from '@/pages/formula'

export default {
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      capitalizeFirstLetter,
      formulas: apiService.formulas,
      isLoading: false,
      user: apiService.user,
    }
  },
  mounted () {
    console.log('Formulas page mounted')
  },
  methods: {
    goto (data) {
      console.log('user wants to go to :', data)
      this.$navigateTo(Formula, { props: { data, orders: this.orders } })
    },
  },
}
</script>
