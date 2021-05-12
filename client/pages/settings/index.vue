<template>
  <div class="main">
    <Header page="settings" />
    <div class="container">
      <!-- <Aside /> -->
      <div class="contentProject">
        <BlockTitleDesc
          :title="texts.SETTINGS_TITLE"
          :description="texts.SETTINGS_DESCRIPTION"
        />
        <TabsNavigation
          :items="texts.SETTINGS_NAV"
        />
        <!-- <Table /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/Header/Header'
import BlockTitleDesc from '~/components/BlockTitleDesc/BlockTitleDesc'
import TabsNavigation from '~/components/TabsNavigation/TabsNavigation'
// import Table from '~/components/Table/Table'

export default {
  name: 'Issues',
  components: {
    Header,
    BlockTitleDesc,
    TabsNavigation
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
