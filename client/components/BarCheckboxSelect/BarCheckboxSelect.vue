<template>
  <transition v-if="selectedColorsLength > 0" name="fade">
    <div class="barCheckox" :class="{ 'is-hidden': !active }">
      <div class="flex">
        <img src="~assets/img/cross.svg" alt="cross" class="cross" @click="handleClick">
        <p class="txt_body text">
          {{ selectedColorsLength }} token selected
        </p>
      </div>
      <a href="/" class="button">
        See analytics
      </a>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BarCheckboxSelect',
  data () {
    return {
      active: true
    }
  },
  computed: {
    ...mapGetters({
      getSelectedLength: 'colors/getSelectedLength'
    }),
    selectedColorsLength () {
      return this.getSelectedLength
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
