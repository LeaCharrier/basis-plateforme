<template>
  <div class="main">
    <Header />
    <div class="container">
      <Aside page="dashboard" />
      <div class="contentProject">
        <BlockTitleDesc
          :title="texts.DASHBOARD_TITLE"
          :description="texts.DASHBOARD_DESCRIPTION"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/Header/Header'
import Aside from '~/components/Aside/Aside'
import BlockTitleDesc from '~/components/BlockTitleDesc/BlockTitleDesc'

export default {
  name: 'Home',
  components: {
    Header,
    Aside,
    BlockTitleDesc
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
