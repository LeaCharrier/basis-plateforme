<template>
  <div class="dropdown">
    <p class="title txt_body">{{ title }} </p>

    <select class="form-control" :required="true">
      <option
        v-for="(option, i) in options"
        v-bind:value="option.value"
        :key="`number-${i}`"
        :selected="option.text == 'select'"
      >{{ option.text }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    options: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    selected: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "Dropdown";
</style>
