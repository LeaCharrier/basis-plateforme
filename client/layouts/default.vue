<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import text from '~/data/text.json'

export default {
  mounted () {
    this.$store.dispatch('text/setTexts', text)
  }
}
</script>

<style lang="scss">

</style>
