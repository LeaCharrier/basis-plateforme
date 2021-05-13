<template>
  <div class="bgPopin" v-show="open">
    <div class="popin">
      <div class="popinTitle">
        <p class="titlePopin">{{ title }}</p>
        <button class="cross" @click="showModal = false" />
      </div>
      <form>
        <div class="popinContent border">
          <div>
            <div class="popinContent-input">
              <label class="title" for="description">Description</label>
              <textarea id="description" class="description" v-model="description" rows="10" cols="50" />
            </div>
            <div class="online">
              <div class="popinContent-input">
                <Select hasLabel="true" title="Assignee" for="assignee" :options="texts.ISSUES_STATUS" />
              </div>
              <div class="popinContent-input">
                <Select hasLabel="true" title="Statut" for="progress" :options="texts.ISSUES_STATUS" />
              </div>
            </div>
          </div>
        </div>
        <div v-show="statut == 'add'" class="popinContent btns">
          <button class="cancel" @click="showModal = false">
            Cancel
          </button>
          <button class="create">
            Create an issue
          </button>
        </div>
        <div v-show="statut == 'update'" class="popinContent btns">
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
</template>

<script>
import { mapGetters } from 'vuex'
import Select from '~/components/Fields/Select/Select'

export default {
  name: 'IssuePopin',
  components: {
    Select
  },
  props: {
    title: {
      type: String,
      required: true
    },
    statut: {
      type: String,
      required: true
    },
    open: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapGetters({
      getTexts: 'text/getTexts'
    }),
    texts () {
      return this.getTexts
    }
  }
}
</script>

<style scoped lang="scss">
@import "IssuePopin";
</style>
