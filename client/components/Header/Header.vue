<template>
  <header>
    <div class="entreprise">
      <img src="~assets/img/maze-logo.png" alt="logo entreprise" class="entreprise-img">
      <div>
        <p class="entreprise-name txt_caption">Maze</p>
        <p class="entreprise-plan txt_caption">Entreprise plan</p>
      </div>
    </div>

    <div class="user">
      <div class="user-infos">
        <img src="~assets/img/user-img.png" alt="logo user" class="user-infos-img">
        <p class="user-infos-name txt_body">Sabrina Nedjah</p>
      </div>
      <a class="user-settings">
        <img src="~assets/img/settings.svg" alt="settings" class="item">
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped lang="scss">
@import "Header";
</style>
