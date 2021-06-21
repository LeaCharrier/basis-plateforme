<template>
  <div class="list block-analyse">
    <div class="list-title">
      <p class="txt_body title" :class="{'txt-load-white empty-txt-small': loading}">
        {{ title }}
      </p>
    </div>

    <div class="graph">
      <div>
        <p class="number" :class="{'txt-load-white empty-txt-small': loading}">
          {{ pourcentageUsed }}%
        </p>
      </div>
      <div class="graph-item" :class="{'txt-load-white empty-txt-small': loading}">
        <div class="jauge jauge-used" :style="'width: ' + pourcentageUsed + '%'" />
      </div>
      <div class="flex graph-infos">
        <p class="title title-used" :class="{'txt-load-white empty-txt-small': loading}">
          Used ({{ totalUsed }})
        </p>
        <p class="title title-unused" :class="{'txt-load-white empty-txt-small': loading}">
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
      type: Number,
      required: true
    },
    totalUnused: {
      type: Number,
      required: true
    },
    pourcentageUsed: {
      type: Number,
      required: true
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "Pourcentage";
@import "../global";
</style>
