<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="bg">
      <app-header :onAccount="true" :user="user" flexShrink="0" />
      <ScrollView orientation="vertical" flexGrow="1">
        <FlexboxLayout flexDirection="column">
          <app-tile :data="{ type: 'smoothie', name: $t('account.my-account') }" :hero="false" />
          <StackLayout class="p-m center">
            <!-- infos -->
            <Label class="mt-l fz-l bold alt" :text="(user.firstname + ' ' + user.lastname).trim()" />
            <!-- TODO https://github.com/Shuunen/green-app/issues/220
            <StackLayout v-if="user.diets && user.diets.length">
              <Label class="mt-l fz-s uppercase" :text="$t('account.my-diets')" />
              <Label class="bold alt fz-m" :text="readableList(diets, user.diets)" />
            </StackLayout>
            -->
            <StackLayout v-if="user.allergens && user.allergens.length">
              <Label class="black mt-l fz-s uppercase" :text="$t('account.my-allergens')" />
              <Label class="bold alt fz-m" :text="readableList(allergens, user.allergens)" />
            </StackLayout>
            <StackLayout v-if="user.store">
              <Label class="black mt-l fz-s uppercase" :text="$t('account.my-target')" />
              <Label class="bold alt fz-m" :text="user.storeLabel" />
            </StackLayout>
            <StackLayout>
              <Label class="black mt-l fz-s uppercase" :text="$t('account.my-language')" />
              <app-lang-selector class="mt-l" />
            </StackLayout>
            <!-- action button -->
            <FlexboxLayout flexDirection="column" flexGrow="1" alignItems="center" class="p-l mt-l">
              <Button class="action validate" :text="$t('account.edit')" @tap="$navigateTo(AccountEdit)" />
              <Button class="action" :text="$t('account.change-password')" @tap="$navigateTo(ChangePassword)" />
            </FlexboxLayout>
          </StackLayout>
          <app-tile :data="{ type: 'formula', name: $t('account.my-orders') }" :hero="false" />
          <StackLayout class="pl-m pr-m black">
            <app-order-line
              v-for="(order, index) in user.orders"
              :key="order.id"
              :class="{even: index % 2, odd: !(index % 2)}"
              :date="$t('account.order-from', { date: readableDate(order.creationDate) })"
              :store="order.storeName"
              :details="readableDetails(order)"
              :price="readablePrice(order.price)"
            />
          </StackLayout>
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
import { apiService } from '@/services'
import { prettyPrint, readableDate, readableList, readablePrice } from '@/utils'
import AccountEdit from '@/pages/account-edit'
import Home from '@/pages/home'
import ChangePassword from '@/pages/change-password'

export default {
  data () {
    return {
      allergens: apiService.allergens,
      diets: apiService.diets,
      AccountEdit,
      Home,
      ChangePassword,
      readableDate,
      readableList,
      readablePrice,
      stores: apiService.stores,
      user: apiService.user,
    }
  },
  mounted () {
    console.log('Account page mounted with user', prettyPrint(this.user))
  },
  methods: {
    readableDetails (order) {
      return [
        `fat ${order.totalFat}g`,
        `cal ${order.totalCarbohydrate}kcal`,
        `proteins ${order.totalProteins}g`,
        `salt ${order.totalSalt}g`,
      ]
    },
  },
}
</script>

<style>
.order-line.even {
  background-color: var(--color-primary-light);
}
</style>
