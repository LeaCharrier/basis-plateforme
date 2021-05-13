<template>
  <div class="table">
    <div class="table-search">
      <Search />
      <Dropdown
        :title="texts.COLORS_SELECT_TITLE_OPTIONS"
        :options="texts.COLORS_SELECT_OPTIONS"
        :selected="texts.COLORS_SELECTED"
      />
    </div>

    <div class="table-title">
      <div class="grow1 input">
        <input type="checkbox" value="all" id="all" v-model="checkedAll" v-on:click="check(source)">
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

    <BarCheckboxSelect v-if="display" :nbrSelect="nbrCheck" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from '~/components/Fields/Search/Search'
import Dropdown from '~/components/Fields/Dropdown/Dropdown'
import TableColorRow from '~/components/TableColorRow/TableColorRow'
import BarCheckboxSelect from '~/components/BarCheckboxSelect/BarCheckboxSelect'

export default {
  name: 'TableColor',
  components: {
    Search,
    Dropdown,
    TableColorRow,
    BarCheckboxSelect
  },
  data () {
    return {
      display: false,
      nbrCheck: 0
    }
  },
  computed: {
    ...mapGetters({
      getTexts: 'text/getTexts'
    }),
    texts () {
      return this.getTexts
    }
  },
  methods: {
    check () {
      console.log(this.checkedAll)
      const checkboxes = document.querySelectorAll('.lineTable input[type="checkbox"]')
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = !this.checkedAll
      }
      const nbrCheck = checkboxes.length
      this.nbrCheck = nbrCheck
      this.display = !this.checkedAll
    }
  }
}
</script>

<style scoped lang="scss">
@import "TableColor";
</style>
