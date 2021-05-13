<template>
  <div class="lineTablet" >
    <div class="grow1">
      <p class="txt_body"> MAZE-300</p>
    </div>
    <div class="grow3 description">
      <p class="txt_body"> Fix column gap value for desktop sd</p>
    </div>
    <div class="grow2">
      <p class="txt_body">Sabrina Nedjah </p>
    </div>
    <div class="grow2">
      <p class="txt_body">Rebranding</p>
    </div>
    <div class="grow2">
      <Status />
    </div>
  </div>
</template>

<script>
import Status from '~/components/Atoms/Status/Status'

export default {
  name: 'TableIssueRow',
  components: {
    Status
  }
  // data () {
  //   return {
  //     checked: false
  //   }
  // }
}
</script>

<style scoped lang="scss">
@import "TableIssueRow";
</style>
