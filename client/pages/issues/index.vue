<template>
  <div class="main">
    <Header />
    <div class="container">
      <Aside page="issue" />
      <div class="contentProject">
        <BlockTitleDesc
          :title="texts.ISSUES_TITLE"
          :description="texts.ISSUES_DESCRIPTION"
        />
        <TabsNavigation
          :items="texts.ISSUES_NAV"
        />
        <Table />
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
import Table from '~/components/Table/Table'

export default {
  name: 'Issues',
  components: {
    Header,
    Aside,
    BlockTitleDesc,
    TabsNavigation,
    Table
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
