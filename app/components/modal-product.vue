<template>
	<StackLayout class="p-20" backgroundColor="white">
		<Button class="button action big right" text="X" @tap="$modal.close({addCart:false})" />
		<Label class="center title-modal" :text='item.name' />
		<Label class="center title-modal" text="description longue ? " />
		<Label class="center title-modal" text="liste allergen " />
		<Label class="center title-modal" text="liste composant" />
		<Image :src='"https://images.greenisbetter-app.com/"+item.picture' stretch="none"  @tap='debug()' />
		<Button class="button action big right" :text="selected ? $t('order.remove-cart') : $t('order.add-cart')" 
		@tap="$modal.close({addCart:true, item:item})" />
	</StackLayout>
</template>

<script>
export default {
  props: {
	item: {
	  type: Object,
	  required: true,
    },
	selected: {
	  type: Boolean,
	  required: true,
    },
  },
  methods: {
	  debug(){
		  // WIP
		   console.log('Pick-modal created', this.selected)
	  }
  }
};
</script>

<style>

.title-modal{
  font-size: 22;
  padding: 10 20;
}
.right {
  text-align: right;
}
</style>