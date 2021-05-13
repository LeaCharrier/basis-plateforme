<template>
  <div class="table">
    <div class="table-search">
      <Search />
      <Dropdown />
    </div>

    <div class="table-title">
      <div class="grow1 input">
        <input id="all" v-model="checkedCategories" type="checkbox" value="all" @change="check($event)">
      </div>
      <div class="grow1">
        <p class="txt_caption">
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
import Dropdown from '~/components/Fields/Dropdown/Dropdown'
import TableIssueRow from '~/components/TableIssueRow/TableIssueRow'

export default {
  name: 'TableIssue',
  components: {
    Search,
    Dropdown,
    TableIssueRow
  },
  methods: {
    check () {
      // console.log(this.checkedCategories)
    }
  }
}
</script>

<style scoped lang="scss">
@import "TableIssue";
</style>
