<template>
  <div class="barCheckox" :class="{ 'is-hidden': !active }">
    <div class="flex">
      <img src="~assets/img/cross.svg" alt="cross" class="cross" @click="handleClick">
      <p class='txt_body text'>1 token selected</p>
    </div>
    <a href="/" class="button">See analytics</a>
  </div>
</template>

<script>
export default {
  name: 'BarCheckboxSelect',
  data () {
    return {
      active: true
    }
  },
  methods: {
    handleClick () {
      this.active = !this.active
    }
  }
}
</script>

<style scoped lang="scss">
@import "BarCheckboxSelect";
</style>
