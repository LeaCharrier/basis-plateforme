<template>
  <div class="list block-analyse">
      <div class="list-title">
        <p class="txt_body title">
          {{ title }}
        </p>
      </div>

      <p class="number">
        {{ total }}
      </p>

      <div class="items">
          <!-- <p class="items-title txt_caption">
            {{ subtitle }}
          </p> -->
          <div class="items-list">
              <a class="item" >
                <p class="item-title">maze.design</p>
                <p class="item-subtitle">Updated 2 days ago</p>
              </a>
              <a class="item">
                <p class="item-title">maze.design</p>
                <p class="item-subtitle">Updated 2 days ago</p>
              </a>
              <a class="item">
                <p class="item-title">maze.design</p>
                <p class="item-subtitle">Updated 2 days ago</p>
              </a>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Projects',
  props: {
    title: {
      type: String,
      required: true
    },
    total: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "Projects";
@import "../global";
</style>
