<template>
  <div class="dropdown">
    <p class="title txt_body">
      {{ title }}
    </p>

    <select class="form-control" :required="true">
      <option
        v-for="(option, i) in options"
        :key="`number-${i}`"
        :value="option.value"
        :selected="option.text == 'select'"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    options: {
      type: Array,
      required: false,
      default: () => []
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    selected: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
@import "Dropdown";
</style>
