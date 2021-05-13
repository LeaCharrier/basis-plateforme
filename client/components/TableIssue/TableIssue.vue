<template>
  <div class="table">
    <IssuePopin />
    <div class="table-search">
      <Search />
      <BtnAdd />
    </div>

    <div class="table-title">
      <div class="grow1">
        <p class="txt_caption is-underline">
          Id
        </p>
      </div>
      <div class="grow3">
        <p class="txt_caption">
          Description
        </p>
      </div>
      <div class="grow2">
        <p class="txt_caption">
          Assignee
        </p>
      </div>
      <div class="grow2">
        <p class="txt_caption">
          Project
        </p>
      </div>
      <div class="grow2">
        <p class="txt_caption">
          Status
        </p>
      </div>
    </div>

    <div>
      <TableIssueRow />
      <TableIssueRow />
      <TableIssueRow />
    </div>
  </div>
</template>

<script>
import Search from '~/components/Fields/Search/Search'
import TableIssueRow from '~/components/TableIssueRow/TableIssueRow'
import BtnAdd from '~/components/Atoms/BtnAdd/BtnAdd'
import IssuePopin from '~/components/IssuePopin/IssuePopin'

export default {
  name: 'TableIssue',
  components: {
    Search,
    TableIssueRow,
    BtnAdd,
    IssuePopin
  },
  data () {
    return {
      isOpen: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "TableIssue";
</style>
