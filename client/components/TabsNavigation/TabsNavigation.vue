<template>
  <div>
    <ul class="tabs">
      <li class="tabs-item" v-for="(item, i) in items" :key="`number-${i}`" :class="{ active: isActive(item.title) }">
        <a class="nav-link" @click.prevent="setActive(item.title)" :href="'#' + item.title">{{ item.title }}</a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane" v-for="(item, i) in items" :key="`number-${i}`" :class="{ 'active show': isActive(item.title) }" :id="item.title">
        <p>{{item.component}}</p>
        <BtnImportJson />
      </div>
    </div>
  </div>
</template>

<script>
// import BlockTitleDesc from '~/components/BlockTitleDesc/BlockTitleDesc'
// import TabsNavigation from '~/components/TabsNavigation/TabsNavigation'
import BtnImportJson from '~/components/Atoms/BtnImportJson/BtnImportJson'

export default {
  name: 'TabsNavigation',
  components: {
    // BlockTitleDesc,
    // TabsNavigation
    BtnImportJson
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data: () => {
    return {
      activeItem: 'Global'
    }
  },
  methods: {
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
    }
  }
}
</script>

<style scoped lang="scss">
@import "TabsNavigation";

.tab-content>.tab-pane {
    display: none;
}

.tab-content>.active {
    display: block;
}
</style>
