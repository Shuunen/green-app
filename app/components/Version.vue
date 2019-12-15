<template>
  <FlexboxLayout class="pt-s pb-m" justifyContent="center">
    <Label class="fz-xs alt" :text="$t('common.version') + ' ' + pkg.version + ' ' + lastCommit" />
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
      pkg,
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
    }),
  },
}
</script>
