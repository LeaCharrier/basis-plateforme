<template>
  <div class="table">
    <!-- <div class="table-search">
      <Search placeholder="Search color design token" />
      <Dropdown
        :title="texts.COLORS_SELECT_TITLE_OPTIONS"
        :options="texts.COLORS_SELECT_OPTIONS"
        :selected="texts.COLORS_SELECTED"
      />
    </div> -->

    <div class="table-title">
      <!-- <div class="grow1 input">
        <input id="all" v-model="checked" type="checkbox" value="all" @change="check">
      </div> -->
      <div class="grow2">
        <p class="txt_caption">
          Token name
        </p>
      </div>
      <div class="grow1">
        <p class="txt_caption">
          Preview
        </p>
      </div>
      <div class="grow1">
        <p class="txt_caption">
          Value
        </p>
      </div>
      <div class="grow2">
        <p class="txt_caption">
          Last update
        </p>
      </div>
      <div class="grow1">
        <p class="txt_caption">
          Status
        </p>
      </div>
      <div class="grow2">
        <p class="txt_caption">
          Source
        </p>
      </div>
    </div>

    <div v-if="colorUsage != null > 0 && !loading">
      <TableColorRow v-for="item in items" :key="item.id" :item="item" />
    </div>

    <BarCheckboxSelect />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import Search from '~/components/Fields/Search/Search'
// import Dropdown from '~/components/Fields/Dropdown/Dropdown'
import TableColorRow from '~/components/TableColorRow/TableColorRow'
import BarCheckboxSelect from '~/components/BarCheckboxSelect/BarCheckboxSelect'

export default {
  name: 'TableColor',
  components: {
    // Search,
    // Dropdown,
    TableColorRow,
    BarCheckboxSelect
  },
  data () {
    return {
      colorUsage: null,
      loading: false,
      checked: false,
      items: [
        {
          id: '1'
        },
        {
          id: '2'
        },
        {
          id: '3'
        }
      ]
    }
  },
  fetch () {
    this.loading = true
    const teamId = (this.user) ? this.user.team : null

    if (teamId) {
      this.$api.get(`figma/team/${teamId}/colors`)
        .then((res) => {
          this.loading = false
          this.colorUsage = res.data
          console.log(this.colorUsage)
        })
        .catch((e) => {
          this.loading = false
          console.log(e)
        })
    }
  },
  computed: {
    ...mapGetters({
      getTexts: 'text/getTexts',
      getUser: 'localStorage/getUser',
      getSelectedLength: 'colors/getSelectedLength'
    }),
    texts () {
      return this.getTexts
    },
    user () {
      return this.getUser
    },
    selectedColorsLength () {
      return this.getSelectedLength
    }
  },
  watch: {
    selectedColorsLength (val) {
      this.checked = val === this.items.length
    }
  },
  methods: {
    ...mapActions({
      setSelected: 'colors/setSelected'
    }),
    check () {
      this.setSelected((this.checked) ? this.items : [])
    }
  }
}
</script>

<style scoped lang="scss">
@import "TableColor";
</style>
