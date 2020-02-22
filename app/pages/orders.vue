<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout class="p-m">
          <app-tile :data="{ type: 'soup', name: $t('order.my-orders') }" :hero="true" />
        </StackLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
export default {
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
  created () {
    console.log('Orders page created')
  },
}
</script>
