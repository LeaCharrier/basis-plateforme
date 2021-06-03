<template>
  <div>
    <button class="txt_body" @click="handleClick">
      Add an issue
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'BtnAdd',
  methods: {
    ...mapActions({
      triggerPopin: 'issues/setPopin'
    }),
    handleClick () {
      this.triggerPopin({ open: true, id: null })
    }
  }
}
</script>

<style scoped lang="scss">
@import "BtnAdd";
</style>
