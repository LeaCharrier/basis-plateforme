<template>
  <div class="main">
    <Header />
    <div class="container">
      <Aside page="colors" />
      <div v-if="objectColor && !loading" class="contentProject">
        <div class="nav">
          <router-link :to="{ name: 'colors' }" class="backColor" />
          <div class="color">
            <p class="color-title">
              {{ objectColor.name }}
            </p>
            <span class="color-item" :style="'background-color:'+ colorHex" />
          </div>
        </div>
        <DashboardColor :object-color="objectColor" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/Header/Header'
import Aside from '~/components/Aside/Aside'
import DashboardColor from '~/components/DashboardColor/DashboardColor'

export default {
  name: 'Colors',
  components: {
    Header,
    Aside,
    DashboardColor
  },
  data () {
    return {
      loading: false,
      colorHex: null,
      objectColor: null
    }
  },
  computed: {
    ...mapGetters({
      getTexts: 'text/getTexts',
      getColors: 'usage/getColors',
      getUser: 'localStorage/getUser'
    }),
    texts () {
      return this.getTexts
    },
    colors () {
      return this.getColors
    },
    user () {
      return this.getUser
    }
  },
  watch: {
    user (newVal) {
      if (newVal) {
        this.getColorUsage()
      }
    },
    colors (newVal, oldVal) {
      if (newVal && (!oldVal.referenced || oldVal.referenced.length !== newVal.referenced.length)) {
        this.colorHex = this.$route.params.color
        this.objectColor = this.getColorData(this.colorHex)
      }
    }
  },
  mounted () {
    this.colorHex = this.$route.params.color

    if (this.colors.length) {
      this.objectColor = this.getColorData(this.colorHex)
    } else if (this.user) {
      this.getColorUsage()
    }
  },
  methods: {
    getColorData (hexa) {
      return this.colors.referenced.find(({ hex }) => hex === hexa)
    },
    async getColorUsage () {
      try {
        const teamId = this.user.team
        const api = this.user.api
        const system = this.user.system

        const { data } = await this.$api.post(`figma/team/${teamId}/projects/files/`, {
          api
        })

        const requests = []

        for (const file of data) {
          requests.push(this.$api.get(`figma/files/${file.key}`, { api }))
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

            this.loading = false
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
  @import "pages/colors/_color/index";
</style>
