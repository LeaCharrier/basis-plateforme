<template>
  <div class="list block-analyse">
      <div class="list-title">
        <p class="txt_body title">
          {{ title }}
        </p>
      </div>

      <div class="graph">
        <div class="flex">
          <p class="number">{{ totalDesigners }}</p>
          <p class="number">{{ totalViewers }}</p>
        </div>
        <div class="graph-item">
          <div class="jauge jauge-designers" style="width: 100%"/>
          <div class="jauge jauge-viewers" :style="'width: ' + totalViewers + '0%'" />
        </div>
        <div class="flex graph-infos">
          <p class="title title-designer">Designers</p>
          <p class="title title-viewers">Viewers</p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Team',
  props: {
    title: {
      type: String,
      required: true
    },
    totalDesigners: {
      type: String,
      required: true
    },
    totalViewers: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "Team";
@import "../global";
</style>
