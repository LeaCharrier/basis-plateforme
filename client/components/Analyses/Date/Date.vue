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
      <p class="items-title txt_caption">
        {{ subtitle }}
      </p>
      <div v-if="link === 'true'" class="items-list link">
        <!-- Si il y a + de 2 items & que ce n'est pas le dernier ajouter la class item-border -->
        <a class="item item-border item-link">
          <p class="item-title">danger-500</p>
          <p class="item-data">84</p>
        </a>
        <a class="item item-border item-link">
          <p class="item-title">danger-500</p>
          <p class="item-data">84</p>
        </a>
        <a class="item item-link">
          <p class="item-title">danger-500</p>
          <p class="item-data">84</p>
        </a>
      </div>

      <div v-if="link !== 'true'" class="items-list link">
        <div class="item">
          <p class="item-title">
            20/06/2021
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Date',
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
    date: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: false,
      default: 'false'
    }
  }
}
</script>

<style scoped lang="scss">
@import "Date";
@import "../global";
</style>
