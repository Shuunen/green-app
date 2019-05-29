<template>
  <ActionBar class="primary-bg white">
    <FlexboxLayout>
      <FlexboxLayout class="pr15" justifyContent="space-between" width="100%">
        <Icon name="menu-white" class="h30" @tap.native="toggleMenu" />
        <Label class="store fz20 bold" :text="user.store" @tap="goAccount" />
        <Icon name="location-white" class="h25" @tap.native="goAccount" />
      </FlexboxLayout>
    </FlexboxLayout>
  </ActionBar>
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
      user: 'user'
    })
  },
  methods: {
    ...mapActions(['goAccount', 'toggleMenu'])
  }
}
</script>
