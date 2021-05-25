<template>
  <div class="preview" :style="bgColor" />
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
      // la couleur ne veut pas etre retourner jsp pq
      bgColor: {
        backgroundColor: this.color
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "Preview";
</style>
