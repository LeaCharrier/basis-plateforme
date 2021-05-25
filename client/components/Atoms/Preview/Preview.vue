<template>
  <div class="preview" :style="myStyle" />
</template>

<script>
export default {
  name: 'Preview',
  props: {
    color: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      myStyle: {
        backgroundColor: this.color
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "Preview";
</style>
