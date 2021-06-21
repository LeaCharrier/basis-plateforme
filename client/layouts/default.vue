<template>
  <div>
    <Nuxt />
    <FormPopin popin="log-in" />
    <OnboardingPopin />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FormPopin from '~/components/FormPopin/FormPopin'
import OnboardingPopin from '~/components/OnboardingPopin/OnboardingPopin'
import text from '~/data/text.json'

export default {
  components: {
    FormPopin,
    OnboardingPopin
  },
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
