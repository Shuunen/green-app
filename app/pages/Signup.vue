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
                  <Label :text="$t('account.first-name')" />
                  <TextField v-model="user.firstName" />
                </StackLayout>
                <StackLayout class="input-field">
                  <Label :text="$t('account.last-name')" />
                  <TextField v-model="user.lastName" />
                </StackLayout>
                <Button class="action mt-m" :text="$t('common.back-login')" @tap="doLogout" />
                <Button class="action validate" :text="$t('common.next-step')" @tap="tabSelected++" />
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
                <Button class="action mt-l" :text="$t('common.previous-step')" @tap="tabSelected--" />
                <Button class="action validate" :text="$t('common.next-step')" @tap="tabSelected++" />
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
                <!-- allergens -->
                <Label :text="$t('signup.step-3')" class="fz-m mb-l" textWrap="true" />
                <Pick :data="userAllergens" :items="{ allergens }" @change="onAllergensPickChange" />
                <Button class="action mt-l" :text="$t('common.previous-step')" @tap="tabSelected--" />
                <Button class="action validate" :text="$t('signup.signup')" :isEnabled="!isLoading" @tap="submit()" />
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
  },

  methods: {
    ...mapActions(['goHome', 'doSignup', 'doLogout']),
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
    submit () {
      console.log('Signup : submit user data :', this.user)
      this.doSignup(this.user)
    },

  },
}
</script>
