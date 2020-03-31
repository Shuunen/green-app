<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <app-header :onAccount="true" :user="user" flexShrink="0" />
      <ScrollView orientation="vertical" flexGrow="1">
        <FlexboxLayout flexDirection="column">
          <app-tile :data="{ type: 'smoothie', name: $t('account.my-account') }" :hero="false" />
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
            <StackLayout>
              <Label class="mt-l fz-s uppercase" :text="$t('account.my-language')" />
              <app-lang-selector class="mt-l" />
            </StackLayout>
            <!-- action button -->
            <FlexboxLayout flexDirection="column" flexGrow="1" alignItems="center" class="p-l mt-l">
              <FlexboxLayout>
                <Button class="action validate" :text="$t('account.edit')" @tap="onEdit" />
                <Button class="action" :text="$t('common.logout')" @tap="doLogout" />
              </FlexboxLayout>
              <Button class="action" :text="$t('common.back-home')" @tap="$navigateTo(Home)" />
            </FlexboxLayout>
          </StackLayout>
          <app-tile :data="{ type: 'formula', name: $t('account.my-orders') }" :hero="false" />
          <app-tile :data="{ type: 'wrap', name: $t('account.about') }" :hero="false" />
          <StackLayout class="p-m">
            <TextView editable="false" class="fz-s" :text="$t('about.description')" />
            <app-version />
          </StackLayout>
        </FlexboxLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { apiService } from '@/services/api-service'
import AccountEdit from '@/pages/account-edit'
import Formatter from '@/utils/formatter'
import Home from '@/pages/home'
import Login from '@/pages/login'

export default {
  data () {
    return {
      user: apiService.user,
      diets: apiService.diets,
      allergens: apiService.allergens,
      Home,
    }
  },
  mounted () {
    console.log('Account page mounted with user', Formatter.prettyPrint(this.user))
  },
  methods: {
    onEdit () {
      console.log('account : user wants to edit his data')
      this.$navigateTo(AccountEdit)
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
