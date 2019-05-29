<template>
  <FlexboxLayout class="pt5 pb10" justifyContent="center">
    <Label class="fz10 alt" :text="$t('common.version') + ' ' + pkg.version + ' ' + lastCommit" />
  </FlexboxLayout>
</template>

<script>
import { mapGetters } from 'vuex'

import pkg from '../../package.json'
import lastCommit from '../last-commit'

export default {
  data () {
    return {
      lastCommit,
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
