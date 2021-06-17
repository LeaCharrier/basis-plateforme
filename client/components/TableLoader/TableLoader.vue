<template>
  <div class="loader">
    <div class="lds-ring" :class="`${color}`">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<script>

export default {
  name: 'TableLoader',
  props: {
    color: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
@import "TableLoader";
</style>
