<template>
  <transition v-if="popin.isOpen" name="fade">
    <div class="bgPopin">
      <div class="popin">
        <div class="popinTitle">
          <p v-if="isNew" class="titlePopin" v-text="texts.ISSUES_STATUS_POPIN_NEW_TITLE" />
          <p v-else class="titlePopin" v-text="texts.ISSUES_STATUS_POPIN_UPDATE_TITLE" />
          <button class="cross" @click="handleClose" />
        </div>
        <form>
          <div class="popinContent border">
            <div>
              <div class="popinContent-input">
                <label class="title" for="description">Description</label>
                <textarea id="description" :value="popin.content" class="description" rows="10" cols="50" />
              </div>
              <div class="online">
                <div class="popinContent-input">
                  <!-- TODO: Pass popin.userId -->
                  <Select :has-label="true" title="Assignee" for="assignee" :options="texts.ISSUES_STATUS" />
                </div>
                <div class="popinContent-input">
                  <!-- TODO: Pass popin.statusId -->
                  <Select :has-label="true" title="Statut" for="progress" :options="texts.ISSUES_STATUS" />
                </div>
              </div>
            </div>
          </div>
          <div v-if="isNew" class="popinContent btns">
            <button class="cancel" @click="handleClose">
              Cancel
            </button>
            <button class="create">
              Create an issue
            </button>
          </div>
          <div v-else class="popinContent btns">
            <button class="delete">
              Delete issue
            </button>
            <button class="create">
              Update issue
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Select from '~/components/Fields/Select/Select'

export default {
  name: 'IssuePopin',
  components: {
    Select
  },
  data () {
    return {
      showModal: false,
      description: ''
    }
  },
  computed: {
    ...mapGetters({
      getTexts: 'text/getTexts',
      getPopin: 'issues/getPopin',
      getPopinStatus: 'issues/getPopinStatus'
    }),
    texts () {
      return this.getTexts
    },
    popin () {
      return this.getPopin
    },
    isNew () {
      return this.getPopinStatus
    }
  },
  methods: {
    ...mapActions({
      triggerPopin: 'issues/setPopin'
    }),
    handleClose () {
      this.triggerPopin(false)
    }
  }
}
</script>

<style scoped lang="scss">
@import "IssuePopin";
</style>
