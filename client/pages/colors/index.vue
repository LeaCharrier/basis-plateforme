<template>
  <div class="main">
    <Header />
    <div class="container">
      <Aside page="colors" />
      <div class="contentProject">
        <BlockTitleDesc
          title="Colors (84 tokens)"
          description="Colors are designed to be clear and accessible. They come in different <br> color themes, constituted each one of grays, semantic and label colors."
        />
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
  name: 'Colors',
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
