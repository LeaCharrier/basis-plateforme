<template>
  <div class="main">
    <Header />
    <div class="container">
      <Aside page="colors" />
      <div class="contentProject">
        <BlockTitleDesc
          v-if="colorUsage.data && !loading"
          :title="'Color (' + colorUsage.data.totalReferenced + ' tokens)'"
          :description="texts.COLORS_DESCRIPTION"
        />
        <BlockTitleDesc
          v-else
          title="Color"
          :description="texts.COLORS_DESCRIPTION"
        />
        <TableColor />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/Header/Header'
import Aside from '~/components/Aside/Aside'
import BlockTitleDesc from '~/components/BlockTitleDesc/BlockTitleDesc'
import TableColor from '~/components/TableColor/TableColor'

export default {
  name: 'Colors',
  components: {
    Header,
    Aside,
    BlockTitleDesc,
    TableColor
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      getTexts: 'text/getTexts',
      getUser: 'localStorage/getUser'
    }),
    texts () {
      return this.getTexts
    },
    colorUsage () {
      return this.$store.state.usage.colors
    },
    user () {
      return this.getUser
    }
  },
  watch: {
    user (newVal) {
      if (newVal) {
        this.getColorUsage(this.user.team)
      }
    }
  },
  mounted () {
    if (this.user) {
      this.getColorUsage(this.user.team)
    }
  },
  methods: {
    async getColorUsage (teamId) {
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

      this.$store.commit('usage/save', colors.data)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "index";
</style>
