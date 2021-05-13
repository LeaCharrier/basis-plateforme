<template>
  <div>
    <button class="txt_body" @click="isOpen = true">
      Add an issue
    </button>

    <IssuePopin v-if="isOpen" open="isOpen" title="Add an issue" statut="add" />
  </div>
</template>

<script>
import IssuePopin from '~/components/IssuePopin/IssuePopin'

export default {
  name: 'BtnAdd',
  components: {
    IssuePopin
  },
  data () {
    return {
      isOpen: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "BtnAdd";
</style>
