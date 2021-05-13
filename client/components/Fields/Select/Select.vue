<template>
  <div class="select">
    <label v-if="hasLabel" class="title" for="for">{{ title }}</label>
    <select class="form-control" :required="true">
      <option
        v-for="(option, i) in options"
        :key="`number-${i}`"
        :value="option.value"
        :selected="option.title == 'select'"
      >
        {{ option.title }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    title: {
      type: String,
      required: true
    },
    for: {
      type: String,
      required: true
    },
    hasLabel: {
      type: Boolean,
      required: true
    },
    options: {
      type: Array,
      required: false,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
@import "Select";
</style>
