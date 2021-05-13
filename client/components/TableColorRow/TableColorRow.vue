<template>
  <div class="lineTable" :class="{'is-select': checked}" @click="$refs.input.click()">
    <div class="grow1 input">
      <input ref="input" v-model="checked" type="checkbox" @change="check">
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
  props: {
    item: {
      type: Object,
      required: true
    }
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
      const isSelected = val.filter(i => i.id === this.item.id)

      this.checked = !!isSelected.length
    }
  },
  methods: {
    ...mapActions({
      pushSelected: 'colors/pushSelected'
    }),
    check () {
      this.pushSelected(this.item)
    }
  }
}
</script>

<style scoped lang="scss">
@import "TableColorRow";
</style>
