<template>
  <Page actionBarHidden="true">
    <app-account-editor v-if="user.email && isEditing" @submit="update" @cancel="cancel" />
    <FlexboxLayout v-else flexDirection="column" class="bg">
      <app-header :user="user" flexShrink="0" />
      <ScrollView orientation="vertical" flexGrow="1">
        <FlexboxLayout flexDirection="column">
          <app-tile :data="{ type: 'smoothie', name: $t('account.my-account') }" :hero="true" />
          <StackLayout class="p-m center">
            <app-lang-selector class="mt-l" />
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
            <StackLayout>
              <Label class="mt-l fz-s uppercase" :text="$t('account.my-language')" />
              <Label class="bold alt fz-m" :text="user.locale" />
            </StackLayout>
            <!-- action button -->
            <FlexboxLayout flexDirection="column" flexGrow="1" alignItems="center" class="p-l mt-l">
              <Button class="action big validate" :text="$t('account.edit')" @tap="onEdit" />
              <Button class="action" :text="$t('common.back-home')" @tap="$navigateTo(Home)" />
              <Button class="action" :text="$t('common.logout')" @tap="doLogout" />
            </FlexboxLayout>
            <app-version />
          </StackLayout>
        </FlexboxLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>

import Formatter from '@/utils/formatter'
import Home from '@/pages/home'
import Login from '@/pages/login'
import { apiService } from '@/services/api-service'

export default {
  data () {
    return {
      user: apiService.user,
      diets: apiService.diets,
      allergens: apiService.allergens,
      Home,
      isEditing: false,
    }
  },
  mounted () {
    console.log('Account page mounted with user', Formatter.prettyPrint(this.user))
  },
  methods: {
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
    doLogout () {
      apiService.doLogout().then(() => this.$navigateTo(Login))
    },
  },
}
</script>