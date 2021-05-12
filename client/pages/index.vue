<template>
  <div class="main">
    <!-- EXEMPLE DE LIEN -->
    <!--<router-link :to="{ name: 'about' }">VERS LA PAGE ABOUT</router-link>-->
    <Header/>
    <div class="container">
      <Aside />
      <div class="content">
        <BlockTitleDesc />
        <TabsNavigation />
        <Table />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header/Header'
import Aside from '~/components/Aside/Aside'
import BlockTitleDesc from '~/components/BlockTitleDesc/BlockTitleDesc'
import TabsNavigation from '~/components/TabsNavigation/TabsNavigation'
import Table from '~/components/Table/Table'

export default {
  name: 'Home',
  components: {
    Header,
    Aside,
    BlockTitleDesc,
    TabsNavigation,
    Table
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
