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

    <div class="items" v-if="object1">
      <p class="items-title txt_caption">
        {{ subtitle }}
      </p>
      <div v-if="link === 'true'" class="items-list link">
        <div class="color" v-for="color in object1" :key="color.hex">
          <router-link :to="{ name: 'colors-color', params: { color: color.hex }}" class="item item-link">
            <p class="item-title">{{ color.name }}</p>
            <p class="item-data">{{ color.data.totalAttached }}</p>
          </router-link>
        </div>
      </div>

      <div v-if="double === true && object2" class="items items2">
        <p class="items-title txt_caption">
          {{ subtitle2 }}
        </p>
        <div class="items-list link">
          <div class="color"  v-for="color in object2" :key="color.hex">
            <router-link :to="{ name: 'colors-color', params: { color: color.hex }}" class="item item-link">
              <p class="item-title">{{ color.name }}</p>
              <p class="item-data">{{ color.totalDetached }}</p>
            </router-link>
          </div>
        </div>
      </div>

      <!-- PROJECTS -->
      <div v-if="link !== 'true' && objectProject" class="items-list link">
        <div class="item" v-for="project in objectProject.projects" :key="project.key">
          <p class="item-title">
            {{ project.name }}
          </p>
          <p class="item-data">
            {{ project.used }}
          </p>
        </div>
      </div>

      <!-- ALIASES -->
      <div v-if="link !== 'true' && objectAliases" class="items-list link">
        <div class="item" v-for="aliases in objectAliases.types" :key="aliases.key">
          <p class="item-title">
            {{ aliases.type }}
          </p>
          <p class="item-data">
            {{ aliases.used }}
          </p>
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
    double: {
      type: Boolean,
      required: false,
      default: false
    },
    link: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    subtitle2: {
      type: String,
      required: false,
      default: ''
    },
    object1: {
      type: Array,
      required: false,
      default: () => []
    },
    object2: {
      type: Array,
      required: false,
      default: () => []
    },
    objectProject: {
      type: Array,
      required: false,
      default: () => []
    },
    objectAliases: {
      type: Array,
      required: false,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
@import "List";
@import "../global";
</style>
