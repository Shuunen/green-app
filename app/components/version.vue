<template>
  <FlexboxLayout class="pt-s pb-m" justifyContent="center">
    <Label class="fz-s alt" :text="$t('common.version') + ' ' + pkg.version + ' - ' + lastCommit" />
  </FlexboxLayout>
</template>

<script>
import pkg from '@/../package.json'
import lastCommit from '@/last-commit'

export default {
  data () {
    return {
      lastCommit,
      pkg,
    }
  },
}
</script>
