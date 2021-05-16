<template>
  <header>
    <div v-if="page === 'settings'">
      <router-link :to="{ name: 'index' }" class="btn-return txt_body">
        Back to dashboard
      </router-link>
    </div>
    <div v-else class="entreprise">
      <img src="~assets/img/maze-logo.png" alt="logo entreprise" class="entreprise-img">
      <div>
        <p class="entreprise-name txt_caption">
          Maze
        </p>
        <p class="entreprise-plan txt_caption">
          Entreprise plan
        </p>
      </div>
    </div>

    <div class="dropdown">
      <div class="dropbtn">
        <img src="~assets/img/user-img.svg" alt="logo user" class="user-infos-img">
        <p class="user-infos-name txt_body">
          Sabrina Nedjah
        </p>
      </div>
      <div class="dropdown-content">
        <router-link :to="{ name: 'settings' }">
          Settings
        </router-link>
        <a href="#">
          Log out
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
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
@import "Header";
</style>
