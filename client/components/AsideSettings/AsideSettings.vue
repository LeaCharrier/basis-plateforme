<template>
  <aside>
    <h2 class="design-title txt_body">
      Ariane Design System
    </h2>
    <p class="design-subtitle txt_note">
      maze/design-system
    </p>

    <TabsNavigation />
  </aside>
</template>

<script>
export default {
  name: 'AsideSettings',
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
@import "AsideSettings";
</style>
