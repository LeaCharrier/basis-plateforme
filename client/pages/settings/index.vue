<template>
  <div class="main">
    <Header page="settings" />
    <div class="container">
      <div class="aside" />
      <div class="contentProject">
        <BlockTitleDesc
          v-if="user && user.firstname"
          :title="texts.SETTINGS_TITLE"
          :description="texts.SETTINGS_DESCRIPTION | str_replace('firstname', user.firstname)"
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
      getTexts: 'text/getTexts',
      getUser: 'localStorage/getUser'
    }),
    texts () {
      return this.getTexts
    },
    user () {
      return this.getUser
    }
  }
}
</script>

<style scoped lang="scss">
  @import "index";
</style>
