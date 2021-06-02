<template>
  <div class="lineTable">
    <!-- <div class="grow1 input">
      <input ref="input" v-model="checked" type="checkbox" @change="check">
    </div> -->
    <div class="grow2">
      <p class="txt_body">
        {{ color.name }}
      </p>
    </div>
    <div class="grow1">
      <Preview :color="color.hex" />
    </div>
    <div class="grow1">
      <p class="txt_body">
        {{ color.hex }}
      </p>
    </div>
    <div class="grow2">
      <p class="txt_body">
        {{ color.updated_at }} by {{ color.user }}
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
    color: {
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
