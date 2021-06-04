<template>
  <div class="list block-analyse">
    <div class="list-title">
      <p class="txt_body title">
        {{ title }}
      </p>
      <router-link v-if="link === 'true'" :to="{ name: 'colors' }" class="txt_caption link">
        View all
      </router-link>
    </div>

    <p class="number">
      {{ total }}
    </p>

    <div class="items">
      <p class="items-title txt_caption">
        {{ subtitle }}
      </p>
      <div>
        <div class="graphTime">
          <div class="graphTime-pourcentage">
            <p>100</p>
            <p>75</p>
            <p>50</p>
            <p>25</p>
            <p>0</p>
          </div>
          <div class="graph">
            <div class="lines">
              <span class="incolore" />
              <span />
              <span />
              <span />
            </div>
            <div class="graph-month june" :style="'height:' + percent +'%'" />
          </div>
        </div>
        <div class="graphTime-month">
          <p>March</p>
          <p>April</p>
          <p>May</p>
          <p>June</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GraphTime',
  props: {
    title: {
      type: String,
      required: true
    },
    total: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: false,
      default: ''
    },
    percent: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
@import "GraphTime";
@import "../global";
</style>
