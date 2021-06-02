<template>
  <div class="select">
    <label v-if="hasLabel" class="title" for="for">{{ title }}</label>
    <select v-model="value" class="form-control" :required="true">
      <option
        v-for="(option, i) in options"
        :key="`number-${i}`"
        :value="option._id || option.key"
      >
        {{ option.label || option.name || (`${option.firstname} ${option.lastname}`) }}
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
    selected: {
      type: String,
      required: false,
      default: ''
    },
    options: {
      type: Array,
      required: false,
      default: () => []
    },
    onChange: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      value: null
    }
  },
  watch: {
    value () {
      this.onChange(this.value)
    },
    selected () {
      if (this.selected) {
        this.value = this.selected
      }
    }
  },
  mounted () {
    if (this.selected) {
      this.value = this.selected
    }
  }
}
</script>

<style scoped lang="scss">
@import "Select";
</style>
