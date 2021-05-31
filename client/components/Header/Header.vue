<template>
  <header>
    <div v-if="page === 'settings'">
      <router-link :to="{ name: 'index' }" class="btn-return txt_body">
        Back to dashboard
      </router-link>
    </div>
    <div v-else class="entreprise">
      <div class="entreprise-img" />
      <div>
        <div class="entreprise-name txt_caption" :class="{'txt-load-white empty-txt-small': !name, 'hidden-label': (!loading && !name)}">
          {{ name ? name : 'Project' }}
        </div>
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
      isOpen: false,
      name: '',
      loading: false
    }
  },
  fetch () {
    this.loading = true

    const teamId = this.user.team
    this.$api.get(`figma/team/${teamId}/projects/`)
      .then((res) => {
        this.loading = false

        if (res.data && res.data.name) {
          this.name = res.data.name
        }
      })
      .catch((e) => {
        this.loading = false
        // eslint-disable-next-line no-console
        console.log(e)
      })
  },
  computed: {
    ...mapGetters({
      getUser: 'localStorage/getUser'
    }),
    user () {
      return this.getUser
    }
  },
  // TODO: ROMOVE FOR PROD
  mounted () {
    // eslint-disable-next-line no-console
    console.log(this.user)
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
