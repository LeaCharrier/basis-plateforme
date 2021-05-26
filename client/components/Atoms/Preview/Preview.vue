<template>
  <div class="preview" :style="{ 'backgroundColor': color }" />
</template>

<script>
export default {
  name: 'Preview',
  props: {
    color: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "Preview";
</style>
