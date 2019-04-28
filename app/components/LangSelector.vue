<template>
  <FlexboxLayout
    justifyContent="space-around"
    alignItems="center"
  >
    <Icon
      v-for="l in locales"
      :key="l.code"
      :name="l.code"
      :class="'h40 ' + (locale.code === l.code ? '' : 'in') + 'active'"
      @tap.native="$i18n.locale = l.code; setLocale(l)"
    />
  </FlexboxLayout>
</template>

<script>
import Icon from '@/components/Icon'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Icon
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      locales: 'locales',
      locale: 'locale'
    })
  },
  methods: {
    ...mapActions(['setLocale'])
  }
}
</script>
