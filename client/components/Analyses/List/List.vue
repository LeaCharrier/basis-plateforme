<template>
  <div class="list block-analyse">
      <div class="list-title">
        <p class="txt_body title">
          {{ title }}
        </p>
        <router-link :to="{ name: 'colors' }" class="txt_caption link" v-if="link === 'true'">
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
          <div class="items-list link" v-if="link === 'true'">
            <!-- Si il y a + de 2 items & que ce n'est pas le dernier ajouter la class -->
              <a class="item item-link" >
                <p class="item-title">danger-500</p>
                <p class="item-data">84</p>
              </a>
              <a class="item item-link">
                <p class="item-title">danger-500</p>
                <p class="item-data">84</p>
              </a>
              <a class="item item-link">
                <p class="item-title">danger-500</p>
                <p class="item-data">84</p>
              </a>
          </div>

          <div class="items-list link" v-if="link !== 'true'">
            <!-- Si il y a + de 2 items & que ce n'est pas le dernier ajouter la class -->
              <div class="item">
                <p class="item-title">danger-500</p>
                <p class="item-data">84</p>
              </div>
              <div class="item">
                <p class="item-title">danger-500</p>
                <p class="item-data">84</p>
              </div>
              <div class="item">
                <p class="item-title">danger-500</p>
                <p class="item-data">84</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
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
    }
  }
}
</script>

<style scoped lang="scss">
@import "List";
@import "../global";
</style>
