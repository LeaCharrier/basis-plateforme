<template>
  <div class="table">
    <div class="table-search">
      <Search />
      <Dropdown />
    </div>

    <div class="table-title">
      <div class="grow1 input">
        <input type="checkbox">
      </div>
      <div class="grow2">
        <p class="txt_caption">Token name</p>
      </div>
      <div class="grow1">
        <p class="txt_caption">Preview</p>
      </div>
      <div class="grow1">
        <p class="txt_caption">Value</p>
      </div>
      <div class="grow2">
        <p class="txt_caption">Last update</p>
      </div>
      <div class="grow1">
        <p class="txt_caption">Status</p>
      </div>
      <div class="grow2">
        <p class="txt_caption">Source</p>
      </div>
    </div>

    <div>
      <TableColorRow />
      <TableColorRow />
      <TableColorRow />
    </div>

    <BarCheckboxSelect />
  </div>
</template>

<script>
import Search from '~/components/Fields/Search/Search'
import Dropdown from '~/components/Fields/Dropdown/Dropdown'
import TableColorRow from '~/components/TableColorRow/TableColorRow'
import BarCheckboxSelect from '~/components/BarCheckboxSelect/BarCheckboxSelect'

export default {
  name: 'Table',
  components: {
    Search,
    Dropdown,
    TableColorRow,
    BarCheckboxSelect
  }
}
</script>

<style scoped lang="scss">
@import "Table";
</style>
