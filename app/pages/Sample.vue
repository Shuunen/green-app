<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <app-header />
      <ScrollView orientation="vertical" flexGrow="1">
        <FlexboxLayout class="p-l" flexDirection="column" alignItems="center">
          <!-- content from here -->
          <app-tile :data="{ type: 'wrap', name: 'héhé' }" />
          <Button class="action" :text="$t('common.back-home')" @tap="$navigateTo(Home)" />
          <!-- end -->
        </FlexboxLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Home from '@/pages/home'

export default {
  data () {
    return {
      Home,
      valid: false,
    }
  },
  created () {
    console.log('Sample page created')
  },
}
</script>
