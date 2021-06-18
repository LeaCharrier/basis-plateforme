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
      try {
        const api = this.user.api
        const system = this.user.system

        const { data } = await this.$api.post(`figma/team/${teamId}/projects/files/`, {
          api
        })

        const requests = []

        for (const file of data) {
          requests.push(this.$api.post(`figma/files/${file.key}`, { api }))
        }

        Promise.allSettled(requests)
          .then(async (res) => {
            let jsons = []

            res.forEach((fileRes) => {
              jsons = [...jsons, ...fileRes.data]
            })

            const colors = await this.$api.post(`figma/team/${teamId}/colors`, {
              api,
              system,
              jsons
            })

            this.$store.commit('usage/save', colors.data.colors)
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
  @import "index";
</style>
