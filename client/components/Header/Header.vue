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

    <router-link :to="{ name: 'settings' }" class="user">
      <div class="user-infos">
        <div class="user-infos-img">
          {{ getInitial(user.firstname, user.lastname) }}
        </div>
        <p class="user-infos-name txt_body" :class="{'txt-load-white': !user}">
          {{ user.firstname }} {{ user.lastname }}
        </p>
      </div>
      <a class="user-settings">
        <img src="~assets/img/settings.svg" alt="settings" class="item">
      </a>
    </router-link>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  props: {
    page: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'localStorage/getUser'
    }),
    user () {
      return this.getUser
    }
  },
  methods: {
    getInitial (fname, lname) {
      return `${fname[0]}${lname[0]}`
    }
  }
}
</script>

<style scoped lang="scss">
@import "Header";

</style>
