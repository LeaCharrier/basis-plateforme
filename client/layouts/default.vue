<template>
  <div>
    <div v-if="windowWidth > 1200">
      <Nuxt />
      <FormPopin popin="log-in" />
      <OnboardingPopin />
    </div>
    <div v-else>
      <ErrorMessage />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FormPopin from '~/components/FormPopin/FormPopin'
import OnboardingPopin from '~/components/OnboardingPopin/OnboardingPopin'
import text from '~/data/text.json'
import ErrorMessage from '~/components/ErrorMessage/ErrorMessage'

export default {
  components: {
    FormPopin,
    OnboardingPopin,
    ErrorMessage
  },
  data () {
    return {
      windowWidth: window.innerWidth
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  mounted () {
    this.setTexts(text)
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  methods: {
    ...mapActions({
      setTexts: 'text/setTexts'
    }),
    onResize () {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>

<style lang="scss">

</style>
