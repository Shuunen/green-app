<template>
  <StackLayout class="bg-alt white p-m" orientation="horizontal">
    <app-icon class="mr-m" height="25" name="location-white" />
    <Label :text="message" verticalAlignment="center" />
  </StackLayout>
</template>

<script>

export default {
  data () {
    return {
      message: 'Hello there !',
    }
  },
}
</script>
