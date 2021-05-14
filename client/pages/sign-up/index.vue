<template>
  <div class="bgDashboard">
    <FormPopin popin="sign-up" />
  </div>
</template>

<script>
import FormPopin from '~/components/FormPopin/FormPopin'

export default {
  name: 'Sign up',
  components: {
    FormPopin
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
