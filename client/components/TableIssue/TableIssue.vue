<template>
  <div class="table">
    <IssuePopin />
    <div class="table-search">
      <CheckIssue
        :on-change="(v) => handleFilter(v)"
      />
      <BtnAdd />
    </div>

    <div class="table-title">
      <div class="grow1">
        <p class="txt_caption is-underline">
          Id
        </p>
      </div>
      <div class="grow3">
        <p class="txt_caption">
          Description
        </p>
      </div>
      <div class="grow2">
        <p class="txt_caption">
          Assignee
        </p>
      </div>
      <div class="grow2">
        <p class="txt_caption">
          Project
        </p>
      </div>
      <div class="grow2">
        <p class="txt_caption">
          Status
        </p>
      </div>
    </div>

    <div>
      <TableIssueRow
        v-for="(item, key) in list"
        :key="item._id"
        :issue-id="item._id"
        :issue-index="key"
        :content="item.content"
        :assignee="item.assignee"
        :creator="item.creator"
        :status="item.status"
        :project="getProjectName(item.project)"
        :prefix="prefix"
        :hide="status && item.status.slug !== status.slug && filter"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TableIssueRow from '~/components/TableIssueRow/TableIssueRow'
import BtnAdd from '~/components/Atoms/BtnAdd/BtnAdd'
import IssuePopin from '~/components/IssuePopin/IssuePopin'
import CheckIssue from '~/components/CheckIssue/CheckIssue'

export default {
  name: 'TableIssue',
  components: {
    TableIssueRow,
    BtnAdd,
    IssuePopin,
    CheckIssue
  },
  data () {
    return {
      loading: false,
      filter: false,
      prefix: '',
      list: [],
      projects: [],
      status: null
    }
  },
  fetch () {
    this.getData()
  },
  computed: {
    ...mapGetters({
      getUser: 'localStorage/getUser',
      getPopin: 'issues/getPopin'
    }),
    user () {
      return this.getUser
    },
    popin () {
      return this.getPopin
    }
  },
  watch: {
    user () {
      this.getData()
    },
    popin () {
      this.getData()
    }
  },
  methods: {
    getData () {
      this.loading = true

      const teamId = (this.user) ? this.user.team : null

      const requests = []

      if (teamId) {
        requests.push(this.$api.get(`figma/team/${teamId}/projects/`))
        requests.push(this.$api.get(`figma/team/${teamId}/files`))
        requests.push(this.$api.get(`issues/list/${teamId}`))
      }

      requests.push(this.$api.get('issues/status/list'))

      Promise.all(requests)
        .then((res) => {
          this.loading = false

          if (res[0] && res[0].data) {
            this.prefix = res[0].data.name
          }

          if (res[1] && res[1].data) {
            this.projects = res[1].data
          }

          if (res[2] && res[2].data) {
            this.list = res[2].data
          }

          if (res[3] && res[3].data) {
            this.status = res[3].data.find(s => s.slug === 'done')
          }
        })
        .catch((e) => {
          this.loading = false
          // eslint-disable-next-line no-console
          console.log(e)
        })
    },
    getProjectName (id) {
      return this.projects.find(p => p.key === id).name
    },
    handleFilter (v) {
      this.filter = v
    }
  }
}
</script>

<style scoped lang="scss">
@import "TableIssue";
</style>
