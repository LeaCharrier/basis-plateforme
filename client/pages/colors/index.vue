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
          :title="texts.COLORS_TITLE"
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
      getTexts: 'text/getTexts'
    }),
    texts () {
      return this.getTexts
    },
    colorUsage () {
      return this.$store.state.usage.colors
    }
  }
}
</script>

<style scoped lang="scss">
  @import "index";
</style>
