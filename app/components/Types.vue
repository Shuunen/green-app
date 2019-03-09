<template>
  <ScrollView orientation="vertical">
    <StackLayout class="pb10">
      <Type v-for="data in typeList" :key="data.type"
        :data="data"
        @tap.native="selectType(data)" />
    </StackLayout>
  </ScrollView>
</template>

<script>
import Type from "@/components/Type";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  components: {
    Type
  },
  data() {
    return {
      listLoaded: false
    };
  },
  computed: {
    ...mapGetters({
      typeList: "typeList",
      isLoading: "isLoading"
    })
  },
  created() {
    console.log("Types created");
    this.load();
  },
  methods: {
    ...mapActions(["loadTypes"]),
    load() {
      this.loadTypes()
        .catch(error => {
          console.error(error);
          alert("An error occurred loading types list.");
        })
        .then(() => (this.listLoaded = true));
    },
    selectType(data) {
      console.log("user wants to see type :", data.type);
    }
  }
};
</script>
