<template>
  <div class="main">
    <Header />
    <div class="container">
      <Aside page="dashboard" />
      <div class="contentProject">
        <BlockTitleDesc
          v-if="user && user.firstname"
          :title="texts.DASHBOARD_TITLE"
          :description="texts.DASHBOARD_DESCRIPTION | str_replace('firstname', user.firstname)"
        />
        <DashboardHome />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/Header/Header'
import Aside from '~/components/Aside/Aside'
import BlockTitleDesc from '~/components/BlockTitleDesc/BlockTitleDesc'
import DashboardHome from '~/components/DashboardHome/DashboardHome'

export default {
  name: 'Home',
  components: {
    Header,
    Aside,
    BlockTitleDesc,
    DashboardHome
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
