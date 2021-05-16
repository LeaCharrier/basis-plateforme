<template>
  <div class="input">
    <p class="txt_body label" v-html="label" />
    <input v-model="message" class="txt_body" :placeholder="placeholder">
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
@import "Input";
</style>
