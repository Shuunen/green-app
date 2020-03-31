<template>
  <Page actionBarHidden="true">
    <TabView :selectedIndex="tabSelected" tabBackgroundColor="transparent" class="bg" @selectedIndexChange="tabChange">
      <TabViewItem :title="$t('common.step', { nb: 1 })">
        <StackLayout>
          <FlexboxLayout flexDirection="column">
            <ScrollView orientation="vertical" flexGrow="1">
              <StackLayout class="p-l">
                <Label :text="$t('signup.step-1')" class="fz-m mb-l" textWrap="true" />
                <StackLayout class="input-field">
                  <Label :text="$t('account.first-name') + ' *'" />
                  <TextField v-model="user.firstName" />
                </StackLayout>
                <StackLayout class="input-field">
                  <Label :text="$t('account.last-name')" />
                  <TextField v-model="user.lastName" />
                </StackLayout>
                <Label :text="$t('common.required-fields')" />
                <FlexboxLayout flexDirection="column" alignItems="center" class="mt-l">
                  <Button class="action big validate" :text="$t('common.next-step')" :isEnabled="isStep1Valid()" @tap="tabSelected++" />
                  <Button class="action" :text="$t('common.back-account')" @tap="cancel" />
                </FlexboxLayout>
              </StackLayout>
            </ScrollView>
          </FlexboxLayout>
        </StackLayout>
      </TabViewItem>
      <TabViewItem :title="$t('common.step', { nb: 2 })">
        <StackLayout>
          <FlexboxLayout flexDirection="column">
            <ScrollView orientation="vertical" flexGrow="1">
              <StackLayout class="p-l">
                <Label :text="$t('signup.step-2')" class="fz-m mb-l" textWrap="true" />
                <app-pick :data="userDiets" :items="{ diets }" @change="onDietsPickChange" />
                <app-pick :data="userAllergens" :items="{ allergens }" @change="onAllergensPickChange" />
                <FlexboxLayout flexDirection="column" alignItems="center" class="mt-l">
                  <Button class="action big validate" :text="$t('common.next-step')" @tap="tabSelected++" />
                  <Button class="action" :text="$t('common.previous-step')" @tap="tabSelected--" />
                </FlexboxLayout>
              </StackLayout>
            </ScrollView>
          </FlexboxLayout>
        </StackLayout>
      </TabViewItem>
      <TabViewItem :title="$t('common.step', { nb: 3 })">
        <StackLayout>
          <FlexboxLayout flexDirection="column">
            <ScrollView orientation="vertical" flexGrow="1">
              <StackLayout class="p-l">
                <Label :text="$t('signup.step-3')" class="fz-m mb-l" textWrap="true" />
                <ListPicker v-model="storeSelected" class="mt-l" :items="stores" @selectedIndexChange="onStoreChange" />
                <FlexboxLayout flexDirection="column" alignItems="center" class="mt-l">
                  <Button class="action big validate" :text="$t('account.complete')" :isEnabled="!isLoading" @tap="submit()" />
                  <Button class="action" :text="$t('common.previous-step')" @tap="tabSelected--" />
                  <ActivityIndicator class="mt-s" :busy="isLoading" />
                </FlexboxLayout>
              </StackLayout>
            </ScrollView>
          </FlexboxLayout>
        </StackLayout>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import Formatter from '@/utils/formatter'
import Account from '@/pages/account'
import { apiService } from '@/services/api-service'
import { clone } from '@/utils'

export default {
  data () {
    return {
      isLoading: false,
      user: {},
      stores: apiService.stores,
      diets: apiService.diets,
      allergens: apiService.allergens,
      tabSelected: 0,
      storeSelected: 0,
      userDiets: { title: 'account.my-diets', from: 'diets', any: true, selection: [] },
      userAllergens: { title: 'account.my-allergens', from: 'allergens', any: true, selection: [] },
    }
  },
  created () {
    this.user = clone(apiService.user)
    console.log('Account edit created with user', Formatter.prettyPrint(this.user))
    this.userDiets.selection = this.diets.filter(d => this.user.diets.includes(d.value)) // [{ title: 'diet.vegan', value: 'vegan' }]
    this.userAllergens.selection = this.allergens.filter(a => this.user.allergens.includes(a.value))
    this.storeSelected = this.stores.findIndex(s => this.user.store === s) || 0
  },
  mounted () {
    console.log('Account edit mounted with user', Formatter.prettyPrint(this.user))
  },
  methods: {
    isStep1Valid () {
      return (this && this.user.firstName ? this.user.firstName.length : 0) > 3
    },
    tabChange (args) {
      this.tabSelected = args.value
    },
    onDietsPickChange () {
      console.log('onDietsPickChange')
      this.user.diets = this.userDiets.selection.map(s => s.value)
    },
    onAllergensPickChange () {
      console.log('onAllergensPickChange')
      this.user.allergens = this.userAllergens.selection.map(s => s.value)
    },
    onStoreChange () {
      this.user.store = this.stores[this.storeSelected]
      console.log('selected store :', this.user.store)
    },
    cancel () {
      console.log('account edit : user canceled')
      this.$navigateTo(Account)
    },
    submit () {
      console.log('account edit : user submitted :', Formatter.prettyPrint(this.user))
      apiService.user = this.user
      // TODO #181 : start loading + apiService.updateUserData + end loading
      this.$navigateTo(Account)
    },

  },
}
</script>