<template>
  <div class="input" :class="{ error }">
    <p class="txt_body label" v-html="label" />
    <input
      v-model="value"
      class="txt_body"
      :placeholder="placeholder"
      :type="type"
      @input="handleChange"
    >
    <transition v-if="error && errorMsg.length" name="fade">
      <div class="input__error">
        {{ errorMsg }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    baseValue: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    validator: {
      type: Function,
      required: false,
      default: null
    },
    errorMsg: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      value: '',
      error: false
    }
  },
  mounted () {
    this.value = this.baseValue
  },
  methods: {
    async handleChange () {
      if (this.validator) {
        this.error = !(await this.validator(this.value))
      }
    },
    resetValue () {
      this.error = false
      this.value = ''
    }
  }
}
</script>

<style scoped lang="scss">
@import "Input";
</style>
