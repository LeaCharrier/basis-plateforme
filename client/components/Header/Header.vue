<template>
  <header>
    <div v-if="page === 'settings'">
      <router-link  :to="{ name: 'index' }" class="btn-return txt_body">
        Back to dashboard
      </router-link>
    </div>
    <div v-else class="entreprise">
      <img src="~assets/img/maze-logo.png" alt="logo entreprise" class="entreprise-img">
      <div>
        <p class="entreprise-name txt_caption">Maze</p>
        <p class="entreprise-plan txt_caption">Entreprise plan</p>
      </div>
    </div>

    <router-link :to="{ name: 'settings' }" class="user">
      <div class="user-infos">
        <img src="~assets/img/user-img.png" alt="logo user" class="user-infos-img">
        <p class="user-infos-name txt_body">Sabrina Nedjah</p>
      </div>
      <a class="user-settings">
        <img src="~assets/img/settings.svg" alt="settings" class="item">
      </a>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    page: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "Header";

</style>
