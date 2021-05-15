<template>
  <div>
    <ul class="tabs">
      <li v-for="(item, i) in items" :key="`number-${i}`" :class="{ active: isActive(item.title) }" class="tabs-item">
        <a class="nav-link" :href="'#' + item.title" @click.prevent="setActive(item.title)">{{ item.title }}</a>
      </li>
    </ul>
    <div class="tab-content">
      <div v-for="(item, i) in items" :id="item.title" :key="`number-${i}`" class="tab-pane" :class="{ 'active show': isActive(item.title) }">
        <FormUpdateUser v-show="item.title === 'My account'" />
        <BlockConnected v-show="item.title === 'Sources'" tab='Sources' />
        <BlockConnected v-show="item.title === 'Destinations'" tab='Destinations' />
        <BlockConnected v-show="item.title === 'Integrations'" tab='Integrations' />
      </div>
    </div>
  </div>
</template>

<script>
import FormUpdateUser from '~/components/FormUpdateUser/FormUpdateUser'
import BlockConnected from '~/components/BlockConnected/BlockConnected'

export default {
  name: 'TabsNavigation',
  components: {
    FormUpdateUser,
    BlockConnected
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data: () => {
    return {
      activeItem: 'My account'
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
