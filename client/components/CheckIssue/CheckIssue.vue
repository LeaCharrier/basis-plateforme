<template>
  <div class="checkIssue">
    <form class="content">
      <input id="checkbox" v-model="checked" type="checkbox">
      <label for="checkbox" class="txt_body title">Show resolved issues</label>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CheckIssue'
}
</script>

<style scoped lang="scss">
@import "CheckIssue";
</style>
