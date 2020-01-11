<template>
  <Page actionBarHidden="true">
    <AccountEditor v-if="user.email" :user="user" @submit="doSignup(user)" @cancel="doLogout" />
  </Page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AccountEditor from '@/components/AccountEditor'
import Formatter from '@/utils/Formatter'
import User from '@/models/User'

export default {
  components: {
    AccountEditor,
  },
  data () {
    return {
      user: {},
    }
  },
  computed: {
    ...mapGetters({ isLoading: 'isLoading', storeUser: 'user' }),
  },
  mounted () {
    this.user = new User({ ...this.storeUser })
    console.log('Signup mounted with user', Formatter.prettyPrint(this.user))
    this.guessNames()
  },
  methods: {
    ...mapActions(['goHome', 'doSignup', 'doLogout']),
    guessNames () {
      const names = (this.user.email.split('@')[0] || '').split('.')
      if (!names || !names.length) return
      if (names[0]) {
        this.user.firstName = Formatter.capitalizeFirstLetter(names[0])
      }
      if (names[1]) {
        this.user.lastName = Formatter.capitalizeFirstLetter(names[1])
      }
    },
  },
}
</script>
