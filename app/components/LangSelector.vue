<template>
  <FlexboxLayout justifyContent="space-around" alignItems="center">
    <Icon v-for="l in locales" :key="l.code" :name="l.code" height="40" :class="'flag flag--' + (locale.code === l.code ? '' : 'in') + 'active'" @tap.native="$i18n.locale = l.code; setLocale(l)" />
  </FlexboxLayout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Icon from '@/components/Icon'

export default {
  components: {
    Icon,
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      locales: 'locales',
      locale: 'locale',
    }),
  },
  methods: {
    ...mapActions(['setLocale']),
  },
}
</script>

<style>
@import url("../assets/styles.css");

.flag {
  padding: 2 4;
  border-width: 1;
  border-color: var(--color-white);
}

.flag--active {
  border-color: var(--color-alt);
}
</style>
