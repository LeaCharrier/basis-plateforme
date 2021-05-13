<template>
  <div class="lineTable" :class="{'is-select': checked}">
    <div class="grow1 input">
      <input v-model="checked" type="checkbox" @change="check">
    </div>
    <div class="grow2">
      <p class="txt_body">
        Blue / Blue-500
      </p>
    </div>
    <div class="grow1">
      <Preview />
    </div>
    <div class="grow1">
      <p class="txt_body">
        #2345678
      </p>
    </div>
    <div class="grow2">
      <p class="txt_body">
        14/06/2021 by sabnjdh
      </p>
    </div>
    <div class="grow1">
      <Status />
    </div>
    <div class="grow2">
      <Source />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Source from '~/components/Atoms/Source/Source'
import Status from '~/components/Atoms/Status/Status'
import Preview from '~/components/Atoms/Preview/Preview'

export default {
  name: 'TableColorRow',
  components: {
    Source,
    Status,
    Preview
  },
  data () {
    return {
      checked: false
    }
  },
  computed: {
    ...mapGetters({
      getSelectedLength: 'colors/getSelected'
    }),
    selectedColors () {
      return this.getSelectedLength
    }
  },
  watch: {
    selectedColors (val) {
      const checkboxes = document.querySelectorAll('.lineTable input[type="checkbox"]')

      if (val === checkboxes.length) {
        this.checked = true
      }
    }
  },
  methods: {
    ...mapActions({
      setSelectedLength: 'colors/setSelected'
    }),
    check () {
      const checkboxes = document.querySelectorAll('.lineTable input[type="checkbox"]:checked')

      this.setSelectedLength(checkboxes.length)
    }
  }
}
</script>

<style scoped lang="scss">
@import "TableColorRow";
</style>
