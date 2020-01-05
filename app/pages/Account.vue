<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
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
import User from '@/models/User'
import Formatter from '@/utils/Formatter'
import Tile from '@/components/Tile'

export default {
  components: {
    Tile,
  },
  data () {
    return {
      user: {},
    }
  },
  computed: {
    ...mapGetters({ isLoading: 'isLoading', storeUser: 'user', stores: 'stores', diets: 'diets', allergens: 'allergens' }),
  },
  mounted () {
    this.user = new User({ ...this.storeUser })
    console.log('Account page mounted with user', JSON.stringify(this.user))
  },
  methods: {
    ...mapActions(['setUser', 'goHome']),
    onEdit () {
      console.log('onEdit')
    },
    readableList (items, selection) {
      return Formatter.readableList(items, selection)
    },
  },
}
</script>
