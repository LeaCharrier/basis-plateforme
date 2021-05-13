<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import text from '~/data/text.json'

export default {
  mounted () {
    this.setTexts(text)
  },
  methods: {
    ...mapActions({
      setTexts: 'text/setTexts'
    })
  }
}
</script>

<style lang="scss">

</style>
