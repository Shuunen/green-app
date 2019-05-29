<template>
  <FlexboxLayout justifyContent="space-around" alignItems="center">
    <Icon v-for="l in locales" :key="l.code" :name="l.code" :class="'h40 flag flag--' + (locale.code === l.code ? '' : 'in') + 'active'" @tap.native="$i18n.locale = l.code; setLocale(l)" />
  </FlexboxLayout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Icon from '@/components/Icon'

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

<style lang="scss">
@import "../assets/styles";

.flag {
  padding: 2 4;
  border-width: 1;
  border-color: $color-white;

  &--active {
    border-color: $color-alt;
    background-color: rgba($color-alt, 0.05);
  }
}
</style>
