<template>
  <div class="bgDashboard">
    <FormPopin popin="log-in" />
  </div>
</template>

<script>
import FormPopin from '~/components/FormPopin/FormPopin'

export default {
  name: 'Log in',
  components: {
    FormPopin
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
