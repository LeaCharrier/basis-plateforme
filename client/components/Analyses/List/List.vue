<template>
  <div class="list block-analyse">
    <div class="list-title">
      <p class="txt_body title" :class="{'txt-load-white empty-txt-small': loading}">
        {{ title }}
      </p>
      <router-link v-if="link" :to="{ name: 'colors' }" class="txt_caption link" :class="{'txt-load-white empty-txt-small': loading}">
        View all
      </router-link>
    </div>

    <p class="number" :class="{'txt-load-white empty-txt-small': loading}">
      {{ total }}
    </p>

    <div v-if="object1 && !loading" class="items">
      <p v-if="object1.length" class="items-title txt_caption">
        {{ subtitle }}
      </p>
      <div v-if="link" class="items-list link">
        <div v-for="color in object1" :key="color.hex" class="color">
          <router-link :to="{ name: 'colors-color', params: { color: color.hex }}" class="item item-link">
            <p class="item-title">
              {{ color.name }}
            </p>
            <p class="item-data">
              {{ color.data.totalAttached }}
            </p>
          </router-link>
        </div>
      </div>

      <div v-if="double === true && object2" class="items items2">
        <p v-if="object2.length" class="items-title txt_caption">
          {{ subtitle2 }}
        </p>
        <div class="items-list link">
          <div v-for="color in object2" :key="color.hex" class="color">
            <router-link :to="{ name: 'colors-color', params: { color: color.hex }}" class="item item-link">
              <p class="item-title">
                {{ color.name }}
              </p>
              <p class="item-data">
                {{ color.totalDetached }}
              </p>
            </router-link>
          </div>
        </div>
      </div>

      <!-- PROJECTS -->
      <div v-if="!link && objectProject" class="items-list link">
        <div v-for="project in objectProject.projects" :key="project.key" class="item">
          <p class="item-title">
            {{ project.name }}
          </p>
          <p class="item-data">
            {{ project.used }}
          </p>
        </div>
      </div>

      <!-- ALIASES -->
      <div v-if="!link && objectAliases" class="items-list link">
        <div v-for="aliases in objectAliases.types" :key="aliases.key" class="item">
          <p class="item-title">
            {{ aliases.type }}
          </p>
          <p class="item-data">
            {{ aliases.used }}
          </p>
        </div>
      </div>
    </div>
    <div v-else-if="loading" class="items">
      <p class="items-title txt_caption" :class="{'txt-load-white empty-txt-small': loading}">
        TOP 3 COLORS USED
      </p>
      <div v-if="link" class="items-list link">
        <div class="color">
          <div class="item item-link">
            <p class="item-title" :class="{'txt-load-white empty-txt-small': loading}">
              primary-500
            </p>
            <p class="item-data" :class="{'txt-load-white empty-txt-small': loading}">
              100
            </p>
          </div>
        </div>
        <div class="color">
          <div class="item item-link">
            <p class="item-title" :class="{'txt-load-white empty-txt-small': loading}">
              primary-500
            </p>
            <p class="item-data" :class="{'txt-load-white empty-txt-small': loading}">
              100
            </p>
          </div>
        </div>
        <div class="color">
          <div class="item item-link">
            <p class="item-title" :class="{'txt-load-white empty-txt-small': loading}">
              primary-500
            </p>
            <p class="item-data" :class="{'txt-load-white empty-txt-small': loading}">
              100
            </p>
          </div>
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
      type: Boolean,
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
@import "List";
@import "../global";
</style>
