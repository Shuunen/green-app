<template>
  <FlexboxLayout class="pt5 pb10" justifyContent="center">
    <Label class="fz10 alt" :text="$t('common.version') + ' ' + pkg.version" />
  </FlexboxLayout>
</template>

<script>
import { mapGetters } from 'vuex'

import pkg from '../../package.json'

export default {
  data () {
    return {
      pkg
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading'
    })
  }
}
</script>
