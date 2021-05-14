<template>
  <aside>
    <h2 class="design-title txt_body">
      Ariane Design System
    </h2>
    <p class="design-subtitle txt_note">
      maze/design-system
    </p>

    <div class="groupes">
      <h3 class="groupes-title txt_caption">
        Overview
      </h3>
      <div class="groupes-items">
        <router-link :class="[page === 'dashboard' ? 'is-active' : '']" :to="{ name: 'index' }" class="item txt_body icon-dash">
          Dashboard
        </router-link>
        <router-link :class="[page === 'issue' ? 'is-active' : '']" :to="{ name: 'issues' }" class="item txt_body icon-issue">
          Issues
        </router-link>
      </div>

      <h3 class="groupes-title txt_caption">
        Design tokens
      </h3>
      <div class="groupes-items">
        <router-link :class="[page === 'colors' ? 'is-active' : '']" :to="{ name: 'colors' }" class="item txt_body icon-color">
          Color
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Aside',
  props: {
    page: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
@import "Aside";
</style>
