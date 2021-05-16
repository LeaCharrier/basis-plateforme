<template>
  <div class="checkIssue">
    <form class="content">
      <input type="checkbox" id="checkbox" v-model="checked">
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
