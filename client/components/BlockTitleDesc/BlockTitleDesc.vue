<template>
  <div class="block">
    <h1 class="txt_title title" v-html="title"></h1>
    <p class="txt_body description" v-html="description"></p>
  </div>
</template>

<script>
export default {
  name: 'BlockTitleDesc',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "BlockTitleDesc";
</style>
