<template>
  <StackLayout class="alt-bg white p10" orientation="horizontal">
    <Icon class="mr10 h25" name="location-white" />
    <Label :text="message" verticalAlignment="center" />
  </StackLayout>
</template>

<script>
import { mapGetters } from 'vuex'

import Icon from '@/components/Icon'

export default {
  components: { Icon },
  data () {
    return {
      message: 'Hello there !'
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading'
    })
  }
}
</script>
