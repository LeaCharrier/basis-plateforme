<template>
  <div class="input">
    <p class="txt_body label" v-html="label" />
    <input v-model="value" class="txt_body" :placeholder="placeholder" :type="type">
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
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    }
  },
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style scoped lang="scss">
@import "Input";
</style>
