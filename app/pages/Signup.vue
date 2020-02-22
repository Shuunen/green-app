<template>
  <Page actionBarHidden="true">
    <app-account-editor v-if="user.email" @submit="doSignup" @cancel="doLogout" />
  </Page>
</template>

<script>
import Formatter from '@/utils/formatter'
import { apiService } from '@/services/api-service'

export default {
  data () {
    return {
      user: apiService.user,
    }
  },
  mounted () {
    console.log('Signup mounted with user', Formatter.prettyPrint(this.user))
  },
  methods: {
    doSignup () {
      this.apiService.doSignup()
    },
    doLogout () {
      this.apiService.doLogout()
    },
  },
}
</script>
