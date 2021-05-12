<template>
  <aside>
    <h2 class="design-title txt_body">Ariane Design System</h2>
    <p class="design-subtitle txt_note">maze/design-system</p>

    <div class="groupes">
      <h3 class="groupes-title txt_caption">Overview</h3>
      <div class="groupes-items">
        <p class="item txt_body icon-dash is-active">Dashboard</p>
        <p class="item icon-issue txt_body">Issues</p>
      </div>

      <h3 class="groupes-title txt_caption">Design tokens</h3>
      <div class="groupes-items">
        <p class="item txt_body icon-color">Color</p>
        <p class="item icon-spacing txt_body">Spacings</p>
        <p class="item icon-shadow txt_body">Shadows</p>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Aside'
}
</script>

<style scoped lang="scss">
@import "Aside";
</style>
