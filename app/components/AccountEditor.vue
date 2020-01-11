<template>
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
                <Button class="action big validate" :text="$t('common.next-step')" :isEnabled="isStep1Valid()" @tap="tabSelected++" />
                <Button class="action" :text="$t('common.back-login')" @tap="cancel" />
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
                <Button class="action big validate" :text="$t('common.next-step')" @tap="tabSelected++" />
                <Button class="action" :text="$t('common.previous-step')" @tap="tabSelected--" />
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
                <Button class="action big validate" :text="$t('account.complete')" :isEnabled="!isLoading" @tap="submit()" />
                <Button class="action" :text="$t('common.previous-step')" @tap="tabSelected--" />
                <ActivityIndicator class="mt-s" :busy="isLoading" />
              </flexboxlayout>
            </StackLayout>
          </ScrollView>
        </flexboxlayout>
      </StackLayout>
    </TabViewItem>
  </TabView>
</template>

<script>
import { mapGetters } from 'vuex'
import Formatter from '@/utils/Formatter'
import Pick from '@/components/Pick'
import User from '@/models/User'

export default {
  components: {
    Pick,
  },
  props: {
    user: {
      type: User,
      required: true,
    },
  },
  data () {
    return {
      tabSelected: 0,
      storeSelected: 0,
      userDiets: { title: 'account.my-diets', from: 'diets', any: true },
      userAllergens: { title: 'account.my-allergens', from: 'allergens', any: true },
    }
  },
  computed: {
    ...mapGetters({ isLoading: 'isLoading', stores: 'stores', diets: 'diets', allergens: 'allergens' }),
  },
  created () {
    this.userDiets.selection = this.diets.filter(d => this.user.diets.includes(d.value)) // [{ title: 'diet.vegan', value: 'vegan' }]
    this.userAllergens.selection = this.allergens.filter(a => this.user.allergens.includes(a.value))
    this.storeSelected = this.stores.findIndex(s => this.user.store === s) || 0
  },
  mounted () {
    console.log('Account editor mounted with user', Formatter.prettyPrint(this.user))
  },
  methods: {
    isStep1Valid () {
      return (this && this.user.firstName ? this.user.firstName.length : 0) > 3
    },
    tabChange (args) {
      this.tabSelected = args.value
    },
    onDietsPickChange () {
      console.log('this.userDiets.selection :', JSON.stringify(this.userDiets.selection))
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
    cancel () {
      console.log('account editor : user canceled')
      this.$emit('cancel')
    },
    submit () {
      console.log('account editor : user submitted :', Formatter.prettyPrint(this.user))
      this.$emit('submit')
    },

  },
}
</script>
