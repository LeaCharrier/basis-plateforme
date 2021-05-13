<template>
  <div class="block">
    <h1 class="txt_title title" v-html="title" />
    <p class="txt_body description" v-html="description" />
  </div>
</template>

<script>
export default {
  name: 'BlockTitleDesc',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    description: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
  @import "BlockTitleDesc";
</style>
