<template>
  <div class="main">
    <Header page="settings" />
    <div class="container">
      <div class="aside" />
      <div class="contentProject">
        <BlockTitleDesc
          :title="texts.SETTINGS_TITLE"
          :description="texts.SETTINGS_DESCRIPTION"
        />
        <TabsNavigation
          :items="texts.SETTINGS_NAV"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/Header/Header'
import TabsNavigation from '~/components/TabsNavigation/TabsNavigation'
import BlockTitleDesc from '~/components/BlockTitleDesc/BlockTitleDesc'

export default {
  name: 'Settings',
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
