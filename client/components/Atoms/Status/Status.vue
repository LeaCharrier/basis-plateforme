<template>
  <div>
    <div class="tag" :style="{ backgroundColor: `${color}30` }">
      <p class="txt_caption" :style="{ color: color }">
        {{ label }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Status',
  props: {
    color: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "Status";
</style>
