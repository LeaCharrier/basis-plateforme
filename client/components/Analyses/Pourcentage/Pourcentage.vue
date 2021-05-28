<template>
  <div class="list block-analyse">
    <div class="list-title">
      <p class="txt_body title">
        {{ title }}
      </p>
    </div>

    <div class="graph">
      <div>
        <p class="number">
          {{ pourcentageUsed }}%
        </p>
      </div>
      <div class="graph-item">
        <div class="jauge jauge-used" :style="'width: ' + pourcentageUsed + '%'" />
      </div>
      <div class="flex graph-infos">
        <p class="title title-used">
          Used ({{ totalUsed }})
        </p>
        <p class="title title-unused">
          Unused ({{ totalUnused }})
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pourcentage',
  props: {
    title: {
      type: String,
      required: true
    },
    totalUsed: {
      type: String,
      required: true
    },
    totalUnused: {
      type: String,
      required: true
    },
    pourcentageUsed: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "Pourcentage";
@import "../global";
</style>
