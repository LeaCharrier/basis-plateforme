<template>
  <transition v-if="!hide" name="fade">
    <div class="lineTablet" @click="handleClick">
      <div class="grow1">
        <p class="txt_body">
          {{ prefix }}-{{ issueIndex }}
        </p>
      </div>
      <div class="grow3 description">
        <p class="txt_body">
          {{ content }}
        </p>
      </div>
      <div class="grow2">
        <p class="txt_body">
          {{ assignee.firstname }} {{ assignee.lastname }}
        </p>
      </div>
      <div class="grow2">
        <p class="txt_body">
          {{ project }}
        </p>
      </div>
      <div class="grow2">
        <Status
          :label="status.label"
          :color="status.color"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'
import Status from '~/components/Atoms/Status/Status'

export default {
  name: 'TableIssueRow',
  components: {
    Status
  },
  props: {
    issueId: {
      type: String,
      required: true
    },
    issueIndex: {
      type: Number,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    project: {
      type: String,
      required: true
    },
    assignee: {
      type: Object,
      required: true
    },
    creator: {
      type: Object,
      required: true
    },
    status: {
      type: Object,
      required: true
    },
    prefix: {
      type: String,
      required: false,
      default: ''
    },
    hide: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    ...mapActions({
      triggerPopin: 'issues/setPopin'
    }),
    handleClick () {
      this.triggerPopin({ open: true, id: this.issueId })
    }
  }
}
</script>

<style scoped lang="scss">
@import "TableIssueRow";
</style>
