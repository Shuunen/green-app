<template>
  <ActionBar class="primary-bg white action-bar">
    <ios>
      <ActionItem icon="res://baseline_menu_white_24" class="h30" ios.position="left" @tap="toggleMenu" />
    </ios>
    <android>
      <NavigationButton icon="res://baseline_menu_white_24" @tap="toggleMenu" />
    </android>
    <StackLayout orientation="horizontal" horizontalAlignment="center">
        <Label class="store fz20 bold" :text="user.store" @tap="goAccount" />
    </StackLayout>
    <ActionItem icon="res://baseline_person_white_24" class="h25" ios.position="right" @tap="goAccount" />
  </ActionBar>
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
      user: 'user',
    }),
  },
  methods: {
    ...mapActions(['goBack', 'goAccount', 'toggleMenu']),
  },
}
</script>
