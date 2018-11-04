<template>
  <StackLayout>
    <Button v-for="data in typeList" :key="data.id"
      :text="data.name"
      @tap="selectType(data)" />
  </StackLayout>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
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
