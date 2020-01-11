<template>
  <Page actionBarHidden="true">
    <AccountEditor v-if="user.email && isEditing" :user="user" @submit="update" @cancel="cancel" />
    <FlexboxLayout v-else flexDirection="column" class="bg">
      <ScrollView orientation="vertical" flexGrow="1">
        <StackLayout>
          <Tile :data="{ type: 'smoothie', name: $t('account.my-account') }" :hero="true" />
          <StackLayout class="p-m center">
            <!-- infos -->
            <Label class="mt-l fz-l bold alt" :text="(user.firstName + ' ' + user.lastName).trim()" />
            <StackLayout v-if="user.diets && user.diets.length">
              <Label class="mt-l fz-s uppercase" :text="$t('account.my-diets')" />
              <Label class="bold alt fz-m" :text="readableList(diets, user.diets)" />
            </StackLayout>
            <StackLayout v-if="user.allergens && user.allergens.length">
              <Label class="mt-l fz-s uppercase" :text="$t('account.my-allergens')" />
              <Label class="bold alt fz-m" :text="readableList(allergens, user.allergens)" />
            </StackLayout>
            <StackLayout v-if="user.store">
              <Label class="mt-l fz-s uppercase" :text="$t('account.my-target')" />
              <Label class="bold alt fz-m" :text="user.store" />
            </StackLayout>
            <!-- action button -->
            <FlexboxLayout flexDirection="column" flexGrow="1" alignItems="center" class="p-l mt-l">
              <Button class="action big validate" :text="$t('account.edit')" @tap="onEdit" />
              <Button class="action" :text="$t('common.back-home')" @tap="goHome" />
            </FlexboxLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AccountEditor from '@/components/AccountEditor'
import Formatter from '@/utils/Formatter'
import Tile from '@/components/Tile'
import User from '@/models/User'

export default {
  components: {
    AccountEditor,
    Tile,
  },
  data () {
    return {
      user: {},
      isEditing: false,
    }
  },
  computed: {
    ...mapGetters({ isLoading: 'isLoading', storeUser: 'user', stores: 'stores', diets: 'diets', allergens: 'allergens' }),
  },
  mounted () {
    this.user = new User({ ...this.storeUser })
    console.log('Account page mounted with user', Formatter.prettyPrint(this.user))
  },
  methods: {
    ...mapActions(['setUser', 'goHome']),
    cancel () {
      console.log('account : user cancelled edition')
      this.isEditing = true
    },
    update () {
      console.log('account : user updated his data', Formatter.prettyPrint(this.user))
      this.isEditing = false
    },
    onEdit () {
      console.log('account : user wants to edit his data')
      this.isEditing = true
    },
    readableList (items, selection) {
      return Formatter.readableList(items, selection)
    },
  },
}
</script>
