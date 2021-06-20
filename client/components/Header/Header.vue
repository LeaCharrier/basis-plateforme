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

    <div class="header-infos">
      <div class="header-infos-btn">
        <button v-if="!isLoad" class="txt_body btn" @click="handleClick">
          Update data
        </button>
        <div v-else class="txt_body is-btn loading">
          <div class="lds-ring">
            <div /><div /><div /><div />
          </div>
          Update data
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
      loading: false,
      isLoad: false
    }
  },
  fetch () {
    this.getData()
  },
  computed: {
    ...mapGetters({
      getUser: 'localStorage/getUser'
    }),
    user () {
      return this.getUser
    }
  },
  watch: {
    user () {
      this.getData()
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
    getData () {
      this.loading = true

      const teamId = (this.user) ? this.user.team : null
      if (teamId) {
        const config = {
          headers: { Authorization: `Bearer ${this.user.token}` }
        }

        this.$api.get(`figma/team/${teamId}/projects/`, config)
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
      }
    },
    getInitial (fname, lname) {
      return `${fname[0]}${lname[0]}`
    },
    handleDropDown () {
      this.isOpen = !this.isOpen
    },
    handleLogout () {
      this.handleDropDown()
      this.logout()
    },
    handleClick () {
      if (this.user) {
        this.getColorUsage(this.user.team)
        this.isLoad = true
      }
    },
    async getColorUsage (teamId) {
      try {
        const api = this.user.api
        const system = this.user.system

        const { data } = await this.$api.post(`figma/team/${teamId}/projects/files/`, {
          api
        })

        const requests = []

        for (const file of data) {
          requests.push(this.$api.get(`figma/files/${file.key}?api=${api}`, { api }))
        }

        Promise.allSettled(requests)
          .then(async (res) => {
            let jsons = []

            res.forEach((fileRes) => {
              if (fileRes.data && fileRes.data.length) {
                jsons = [...jsons, ...fileRes.data]
              }

              if (fileRes.value && fileRes.value.data && fileRes.value.data.length) {
                jsons = [...jsons, ...fileRes.value.data]
              }
            })

            const colors = await this.$api.post(`figma/team/${teamId}/colors`, {
              api,
              system,
              jsons
            })

            this.$store.commit('usage/save', colors.data)
          })
          .catch((e) => {
            // eslint-disable-next-line no-console
            console.log(e)
          })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "Header";
</style>
