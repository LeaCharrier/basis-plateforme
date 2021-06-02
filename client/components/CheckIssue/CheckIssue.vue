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
  name: 'CheckIssue',
  props: {
    onChange: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      checked: false
    }
  },
  watch: {
    checked () {
      this.onChange(this.checked)
    }
  }
}
</script>

<style scoped lang="scss">
@import "CheckIssue";
</style>
