<template>
  <Page actionBarHidden="true">
    <ScrollView orientation="vertical">
      <StackLayout class="pb10">
        <Type
          v-for="(data, index) in typeList"
          :key="data.type"
          :data="data"
          :large="index === 0"
          @tap.native="selectType(data)"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import Type from '@/components/Type'
import { mapGetters, mapActions } from 'vuex'
import TypeDetails from '@/pages/TypeDetails'

export default {
  components: {
    Type
  },
  data () {
    return {
      listLoaded: false
    }
  },
  computed: {
    ...mapGetters({
      typeList: 'typeList',
      isLoading: 'isLoading'
    })
  },
  created () {
    console.log('Home created')
    this.load()
  },
  methods: {
    ...mapActions(['loadTypes']),
    load () {
      this.loadTypes()
        .catch(error => {
          console.error(error)
          alert('An error occurred loading types list.')
        })
        .then(() => {
          this.listLoaded = true
          // this.gotoFirstType();
        })
    },
    /*
    gotoFirstType() {
      setTimeout(() => console.log("\n\nPLEASE REMOVE ME ^^ "), 1000);
      this.$navigateTo(TypeDetails, {
        frame: "mainContent",
        props: { data: this.typeList[0] }
      });
    },
    */
    selectType (data) {
      console.log('user wants to see type :', data)
      this.$navigateTo(TypeDetails, {
        frame: 'mainContent',
        props: { data }
      })
    }
  }
}
</script>
