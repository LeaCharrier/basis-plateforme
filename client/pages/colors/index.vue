<template>
  <div class="main">
    <Header />
    <div class="container">
      <Aside page="colors" />
      <div class="contentProject">
        <BlockTitleDesc
          :title="texts.COLORS_TITLE"
          :description="texts.COLORS_DESCRIPTION"
        />
        <TabsNavigation
          :items="texts.COLORS_NAV"
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
import TabsNavigation from '~/components/TabsNavigation/TabsNavigation'
import TableColor from '~/components/TableColor/TableColor'

export default {
  name: 'Colors',
  components: {
    Header,
    Aside,
    BlockTitleDesc,
    TabsNavigation,
    TableColor
  },
  computed: {
    ...mapGetters({
      getTexts: 'text/getTexts'
    }),
    texts () {
      return this.getTexts
    }
  }
}
</script>

<style scoped lang="scss">
  @import "index";
</style>
