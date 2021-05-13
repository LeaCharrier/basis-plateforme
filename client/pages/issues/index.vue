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
        <TableIssue />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/Header/Header'
import Aside from '~/components/Aside/Aside'
import BlockTitleDesc from '~/components/BlockTitleDesc/BlockTitleDesc'
import TableIssue from '~/components/TableIssue/TableIssue'

export default {
  name: 'Issues',
  components: {
    Header,
    Aside,
    BlockTitleDesc,
    TableIssue
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
