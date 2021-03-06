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

    if (this.colors.referenced && this.colors.referenced.length) {
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
      this.loading = true
      const teamId = this.user.team
      const api = this.user.api
      const system = this.user.system

      const { data } = await this.$api.post(`figma/team/${teamId}/projects/files/`, {
        api
      })

      let jsons = []
      let systemFile = null

      for (const file of data) {
        const response = await this.$api.get(`figma/files/${file.key}?api=${api}`, { api })

        if (response.status === 200 && response.data && response.data.formated && response.data.formated.length) {
          jsons = [...jsons, ...response.data.formated]

          if (file.key === system) {
            systemFile = response.data.raw
          }
        }
      }

      const colors = await this.$api.post(`figma/team/${teamId}/colors`, {
        api,
        system,
        systemFile,
        jsons
      })
      this.loading = false
      this.$store.commit('usage/save', colors.data)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "pages/colors/_color/index";
</style>
