<template>
  <div class="input">
    <p class="txt_body label" v-html="label" />
    <input class="txt_body" v-model="message" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    label: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "Input";
</style>
