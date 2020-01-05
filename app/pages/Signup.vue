<template>
  <Page actionBarHidden="true">
    <TabView :selectedIndex="tabSelected" tabBackgroundColor="transparent" class="bg" @selectedIndexChange="tabChange">
      <TabViewItem :title="$t('common.step', { nb: 1 })">
        <StackLayout>
          <FlexboxLayout flexDirection="column">
            <ScrollView orientation="vertical" flexGrow="1">
              <StackLayout class="p-l">
                <!-- personnal infos -->
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
                <!-- action buttons -->
                <FlexboxLayout flexDirection="column" alignItems="center" class="mt-l">
                  <Button class="action" :text="$t('common.back-login')" @tap="doLogout" />
                  <Button class="action big validate" :text="$t('common.next-step')" :isEnabled="isStep1Valid()" @tap="tabSelected++" />
                </flexboxlayout>
              </StackLayout>
            </ScrollView>
          </flexboxlayout>
        </StackLayout>
      </TabViewItem>
      <TabViewItem :title="$t('common.step', { nb: 2 })">
        <StackLayout>
          <FlexboxLayout flexDirection="column">
            <ScrollView orientation="vertical" flexGrow="1">
              <StackLayout class="p-l">
                <!-- diets -->
                <Label :text="$t('signup.step-2')" class="fz-m mb-l" textWrap="true" />
                <Pick :data="userDiets" :items="{ diets }" @change="onDietsPickChange" />
                <!-- allergens -->
                <Pick :data="userAllergens" :items="{ allergens }" @change="onAllergensPickChange" />
                <!-- action buttons -->
                <FlexboxLayout flexDirection="column" alignItems="center" class="mt-l">
                  <Button class="action" :text="$t('common.previous-step')" @tap="tabSelected--" />
                  <Button class="action big validate" :text="$t('common.next-step')" @tap="tabSelected++" />
                </flexboxlayout>
              </StackLayout>
            </ScrollView>
          </flexboxlayout>
        </StackLayout>
      </TabViewItem>
      <TabViewItem :title="$t('common.step', { nb: 3 })">
        <StackLayout>
          <FlexboxLayout flexDirection="column">
            <ScrollView orientation="vertical" flexGrow="1">
              <StackLayout class="p-l">
                <!-- restaurant -->
                <Label :text="$t('signup.step-3')" class="fz-m mb-l" textWrap="true" />
                <ListPicker v-model="storeSelected" class="mt-l" :items="stores" @selectedIndexChange="onStoreChange" />
                <!-- action buttons -->
                <FlexboxLayout flexDirection="column" alignItems="center" class="mt-l">
                  <Button class="action" :text="$t('common.previous-step')" @tap="tabSelected--" />
                  <Button class="action big validate" :text="$t('signup.signup')" :isEnabled="!isLoading" @tap="submit()" />
                  <ActivityIndicator class="mt-s" :busy="isLoading" />
                </flexboxlayout>
              </StackLayout>
            </ScrollView>
          </flexboxlayout>
        </StackLayout>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import User from '@/models/User'
import Pick from '@/components/Pick'
import Formatter from '@/utils/Formatter'

export default {
  components: {
    Pick,
  },
  data () {
    return {
      tabSelected: 0,
      storeSelected: 0,
      user: {},
      userDiets: { title: 'account.my-diets', from: 'diets', any: true },
      userAllergens: { title: 'account.my-allergens', from: 'allergens', any: true },
    }
  },

  computed: {
    ...mapGetters({ isLoading: 'isLoading', storeUser: 'user', stores: 'stores', diets: 'diets', allergens: 'allergens' }),
  },

  mounted () {
    this.user = new User({ ...this.storeUser })
    console.log('Signup mounted with user', this.user.email)
    this.guessNames()
    this.onStoreChange()
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
    isStep1Valid () {
      return (this && this.user.firstName ? this.user.firstName.length : 0) > 3
    },
    tabChange (args) {
      this.tabSelected = args.value
    },
    onDietsPickChange () {
      this.user.diets = this.userDiets.selection.map(s => s.value)
      console.log('onDietsPickChange', this.user.diets)
    },
    onAllergensPickChange () {
      this.user.allergens = this.userAllergens.selection.map(s => s.value)
      console.log('onAllergensPickChange', this.user.allergens)
    },
    onStoreChange () {
      this.user.store = this.stores[this.storeSelected]
      console.log('selected store :', this.user.store)
    },
    submit () {
      console.log('Signup : submit user data :', this.user)
      this.doSignup(this.user)
    },

  },
}
</script>
