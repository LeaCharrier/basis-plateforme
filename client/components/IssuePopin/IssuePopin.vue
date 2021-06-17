<template>
  <transition v-if="popin" name="fade">
    <div class="bgPopin">
      <div class="popin">
        <transition v-if="loading" name="fade">
          <div class="popin__loader">
            <TableLoader color="dark" />
          </div>
        </transition>
        <div class="popinTitle">
          <p v-if="isNew" class="titlePopin" v-text="texts.ISSUES_STATUS_POPIN_NEW_TITLE" />
          <p v-else class="titlePopin" v-text="texts.ISSUES_STATUS_POPIN_UPDATE_TITLE" />
          <button class="cross" @click="handleClose" />
        </div>
        <div class="form">
          <div class="popinContent border">
            <div>
              <div class="popinContent-input">
                <label class="title" for="description">Description</label>
                <textarea id="description" v-model="description" class="description" rows="10" cols="50" />
              </div>
              <div class="online">
                <div class="popinContent-inputFull">
                  <!-- TODO: Pass popin.userId -->
                  <Select
                    :has-label="true"
                    title="Project"
                    for="project"
                    :options="projects"
                    :selected="projectId"
                    :on-change="(v) => onSelectChange('projectId', v)"
                  />
                </div>
                <div class="popinContent-input">
                  <!-- TODO: Pass popin.userId -->
                  <Select
                    :has-label="true"
                    title="Assignee"
                    for="assignee"
                    :options="team"
                    :selected="assigneeId"
                    :on-change="(v) => onSelectChange('assigneeId', v)"
                  />
                </div>
                <div class="popinContent-input">
                  <!-- TODO: Pass popin.statusId -->
                  <Select
                    :has-label="true"
                    title="Statut"
                    for="progress"
                    :options="status"
                    :selected="statusId"
                    :on-change="(v) => onSelectChange('statusId', v)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-if="isNew" class="popinContent btns">
            <button class="cancel" @click="handleClose">
              Cancel
            </button>
            <button class="create" @click="handleCreate">
              Create an issue
            </button>
          </div>
          <div v-else class="popinContent btns">
            <button class="delete" @click="handleDelete">
              Delete issue
            </button>
            <button class="create" @click="handleUpdate">
              Update issue
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Select from '~/components/Fields/Select/Select'
import TableLoader from '~/components/TableLoader/TableLoader'

export default {
  name: 'IssuePopin',
  components: {
    Select,
    TableLoader
  },
  data () {
    return {
      showModal: false,
      description: '',
      statusId: null,
      assigneeId: null,
      projectId: null,
      issue: null,
      team: [],
      status: [],
      projects: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      getTexts: 'text/getTexts',
      getPopin: 'issues/getPopin',
      getPopinStatus: 'issues/getPopinStatus',
      getPopinId: 'issues/getPopinId',
      getUser: 'localStorage/getUser'
    }),
    user () {
      return this.getUser
    },
    texts () {
      return this.getTexts
    },
    popin () {
      return this.getPopin
    },
    isNew () {
      return this.getPopinStatus
    },
    id () {
      return this.getPopinId
    }
  },
  watch: {
    popin () {
      this.getData()
    }
  },
  methods: {
    ...mapActions({
      triggerPopin: 'issues/setPopin'
    }),
    handleClose () {
      this.triggerPopin({ open: false, id: null })
    },
    getData () {
      this.loading = true

      const requests = [
        this.$api.get('issues/status/list'),
        this.$api.get(`auth/team/${this.user.team}`),
        this.$api.get(`figma/team/${this.user.team}/files`)
      ]

      if (this.id) {
        requests.push(this.$api.get(`issues/issue/${this.id}`))
      } else {
        this.issue = null
        this.description = null
        this.statusId = null
        this.assigneeId = null
        this.projectId = null
      }

      Promise.all(requests)
        .then((res) => {
          this.loading = false
          if (res[0] && res[0].data) {
            this.status = res[0].data
          }

          if (res[1] && res[1].data) {
            this.team = res[1].data
          }

          if (res[2] && res[2].data) {
            this.projects = res[2].data
          }

          if (res[3] && res[3].data) {
            const issueData = res[3].data

            this.issue = issueData
            this.description = issueData.content
            this.statusId = issueData.status._id
            this.assigneeId = issueData.assignee._id
            this.projectId = issueData.project
          }
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e)
        })
    },
    onSelectChange (k, v) {
      this[k] = v
    },
    handleCreate () {
      this.loading = true

      this.$api.post('issues/issue/create', {
        content: this.description,
        assignee: this.assigneeId,
        status: this.statusId,
        project: this.projectId,
        creator: this.user._id,
        team: this.user.team
      })
        .then(() => {
          // SUCCESS
          this.loading = false
          this.handleClose()
        })
        .catch((e) => {
          // ERROR
          // eslint-disable-next-line no-console
          console.log(e)
        })
    },
    handleUpdate () {
      this.loading = true

      this.$api.put(`issues/issue/${this.id}/update`, {
        content: this.description,
        assignee: this.assigneeId,
        status: this.statusId,
        project: this.projectId
      })
        .then(() => {
          // SUCCESS
          this.loading = false
          this.handleClose()
        })
        .catch((e) => {
          // ERROR
          // eslint-disable-next-line no-console
          console.log(e)
        })
    },
    handleDelete () {
      this.loading = true

      const statusId = this.status.find(s => s.slug === 'cancelled')._id

      this.$api.put(`issues/issue/${this.id}/update`, {
        status: statusId
      })
        .then(() => {
          // SUCCESS
          this.loading = false
          this.handleClose()
        })
        .catch((e) => {
          // ERROR
          // eslint-disable-next-line no-console
          console.log(e)
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import "IssuePopin";
</style>
