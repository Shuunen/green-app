<template>
  <FlexboxLayout justifyContent="space-around" alignItems="center">
    <app-icon v-for="l in locales" :key="l.code" :name="l.code" height="40" :class="'flag flag--' + (locale === l.code ? '' : 'in') + 'active'" @tap.native="setLocale(l.code)" />
  </FlexboxLayout>
</template>

<script>
import { apiService } from '@/services/api-service'

export default {
  data () {
    return {
      locales: apiService.locales,
      locale: apiService.locale,
    }
  },
  methods: {
    setLocale (locale) {
      console.log('user wants to set locale to : ' + locale)
      this.locale = locale
      apiService.locale = locale
    },
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
