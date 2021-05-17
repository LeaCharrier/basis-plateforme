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

    <div class="dropdown" :class="{'open': isOpen}">
      <div class="dropbtn" @click="handleDropDown">
        <div class="user-infos-img">
          <div v-if="user">
            {{ getInitial(user.firstname, user.lastname) }}
          </div>
        </div>
        <div class="user-infos-name txt_body" :class="{'txt-load-white empty-txt-small': !user}">
          <p v-if="user">
            {{ user.firstname }} {{ user.lastname }}
          </p>
          <p v-else>
            firstname lastname
          </p>
        </div>
      </div>
      <div class="dropdown-content">
        <router-link :to="{ name: 'settings' }">
          Settings
        </router-link>
        <a @click="handleLogout">
          Log out
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Header',
  props: {
    page: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      isOpen: false
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
    ...mapActions({
      logout: 'localStorage/logout'
    }),
    getInitial (fname, lname) {
      return `${fname[0]}${lname[0]}`
    },
    handleDropDown () {
      this.isOpen = !this.isOpen
    },
    handleLogout () {
      this.handleDropDown()
      this.logout()
    }
  }
}
</script>

<style scoped lang="scss">
@import "Header";
</style>
