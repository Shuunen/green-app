<template>
  <Page>
    <Header />
    <FlexboxLayout flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout>
          <Tile :data="{ type: 'smoothie', name: $t('account.my-account') }" :hero="true" />
          <StackLayout class="p10" :class="{'read-only': !editMode}">
            <!-- personnal infos -->
            <Label class="mt15 ml3" :text="$t('account.first-name')" />
            <TextField v-model="userData.firstName" :editable="editMode" />
            <Label class="mt15 ml3" :text="$t('account.last-name')" />
            <TextField v-model="userData.lastName" :editable="editMode" />
            <!-- store -->
            <Label class="mt15 ml3" :text="$t('account.my-target')" />
            <TextField v-show="!editMode" :text="userData.store" :editable="editMode" />
            <ListPicker v-show="editMode" v-model="storeSelected" class="mt15" :items="stores" @selectedIndexChange="onStoreChange" />
            <!-- action button -->
            <FlexboxLayout flexGrow="1" justifyContent="center" class="p20">
              <!-- @tap="editMode = !editMode; setUser(JSON.parse(JSON.stringify(userData)))" -->
              <Button class="action mb20" :class="{ validate: editMode }" :text="editMode ? 'Save' : 'Edit'" @tap="onToggleEdit" />
            </FlexboxLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Header from '@/components/Header'
import Tile from '@/components/Tile'

export default {
  components: {
    Header,
    Tile,
  },
  data () {
    return {
      userData: {},
      storeSelected: 0,
      stores: [
        'Green La Defense (75)',
        'Green Montparnasse (75)',
        'Green Bercy Village (75)',
        'Green Boulogne Billancourt (93)',
        'Green Les Long Champs (35)',
        'Green Cesson-Sévigné (35)',
        'Green La Beaujoire (44)',
        'Green Centre Sud (44)',
      ],
      editMode: false,
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      user: 'user',
    }),
  },
  created () {
    console.log('Account page created')
    // because findIndex returns -1 if not found, math max will set default store selected to 0
    this.storeSelected = Math.max(this.stores.findIndex(store => store === this.user.store), 0)
    this.userData = { ...this.user }
  },
  methods: {
    ...mapActions(['setUser']),
    onToggleEdit () {
      if (this.editMode) {
        // save
        this.setUser({
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          store: this.userData.store,
        })
      }
      this.editMode = !this.editMode
    },
    onStoreChange () {
      console.log('onStoreChange')
      this.userData.store = this.stores[this.storeSelected]
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/styles";

TextField {
  color: $color-black;
  border-bottom-width: 1;
  border-bottom-color: $color-black;
  margin-bottom: 10;
}

.read-only TextField {
  color: $color-grey;
  border-bottom-color: $color-disabled;
}
</style>
