<template>
	<StackLayout class="p-20" backgroundColor="white">
		<Button class="button action big right" text="X" @tap="$modal.close()" />
		<Label class="center header-modal" :text='item.name' />
		<Image :src='"https://images.greenisbetter-app.com/"+item.picture' stretch="aspectFit"  @tap='debug()' />
	</StackLayout>
</template>

<script>
export default {
  props: {
	item: {
	  type: Object,
	  required: true,
    },
  },
  methods: {
	  debug(){
		  // WIP
		   console.log('Pick-modal created', this.item)
	  }
  },
    data() {
        return {};
    }
};
</script>

<style>

.header-modal{
  font-size: 22;
  padding: 10 20;
}
.right {
  text-align: right;
}
</style>