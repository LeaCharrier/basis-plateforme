<template>
  <div class="list block-analyse">
    <div class="list-title">
      <p class="txt_body title">
        {{ title }}
      </p>
      <router-link :to="{ name: 'issues' }" class="txt_caption link">
        View all
      </router-link>
    </div>

    <p class="number" :class="{'txt-load-white empty-txt-small': loading}">
      {{ issues.length }}
    </p>

    <div class="items">
      <p class="items-title txt_caption">
        {{ subtitle }}
      </p>
      <div v-if="!loading" class="items-list items-issues">
        <div v-for="s in status" :key="s._id" class="item">
          <p class="item-title" :class="[`issue-${s.slug}`]">
            {{ s.label }}
          </p>
          <p class="item-data">
            {{ s.issues.length || 0 }}
          </p>
        </div>
      </div>
      <div v-else class="items-list items-issues">
        <div class="item">
          <p class="item-title issue-done" :class="{'txt-load-white empty-txt-small': loading}">
            Done
          </p>
          <p class="item-data" :class="{'txt-load-white empty-txt-small': loading}">
            84
          </p>
        </div>
        <div class="item">
          <p class="item-title issue-progress" :class="{'txt-load-white empty-txt-small': loading}">
            In progress
          </p>
          <p class="item-data" :class="{'txt-load-white empty-txt-small': loading}">
            84
          </p>
        </div>
        <div class="item">
          <p class="item-title issue-cancelled" :class="{'txt-load-white empty-txt-small': loading}">
            Cancelled
          </p>
          <p class="item-data" :class="{'txt-load-white empty-txt-small': loading}">
            20
          </p>
        </div>
        <div class="item">
          <p class="item-title issue-backlog" :class="{'txt-load-white empty-txt-small': loading}">
            Backlog
          </p>
          <p class="item-data" :class="{'txt-load-white empty-txt-small': loading}">
            17
          </p>
        </div>
      </div>
    </div>

    <div class="items last-issue">
      <p class="items-title txt_caption">
        Latest Issues
      </p>
      <div v-if="!loading" class="items-list link">
        <div v-for="(issue, k) in issues.slice(-3).reverse()" :key="k" class="item">
          <p class="item-title">
            {{ issue.content }}
          </p>
          <p class="item-info txt_caption">
            #{{ (issues.length - 1) - k }} opened on {{ formatDate(issue.createdAt) }} by {{ (`${issue.creator.firstname} ${issue.creator.lastname}`) }}
          </p>
        </div>
      </div>
      <div v-else class="items-list link">
        <div class="item">
          <p class="item-title" :class="{'txt-load-white empty-txt-small': loading}">
            Remove unused h1 mobile style
          </p>
          <p class="item-info txt_caption" :class="{'txt-load-white empty-txt-small': loading}">
            #47 opened on 14/06 by sabnjdh
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Issues',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      status: [],
      issues: []
    }
  },
  fetch () {
    this.getData()
  },
  computed: {
    ...mapGetters({
      getUser: 'localStorage/getUser'
    }),
    user () {
      return this.getUser
    }
  },
  watch: {
    user () {
      this.getData()
    },
    $route () {
      this.getData()
    }
  },
  methods: {
    getData () {
      this.loading = true

      const requests = []

      const config = {
        headers: { Authorization: `Bearer ${this.user.token}` }
      }

      requests.push(this.$api.get('issues/status/list', config))

      const teamId = (this.user) ? this.user.team : null

      if (teamId) {
        requests.push(this.$api.get(`issues/list/${teamId}`, config))
      }

      Promise.all(requests)
        .then((res) => {
          this.loading = false

          if (res[0] && res[0].data) {
            this.status = res[0].data
          }

          if (res[1] && res[1].data) {
            this.issues = res[1].data

            this.status = this.status.map((s) => {
              const issues = this.issues.filter(i => i.status._id === s._id)

              return {
                ...s,
                issues
              }
            })
          }
        })
        .catch((e) => {
          this.loading = false
          // eslint-disable-next-line no-console
          console.log(e)
        })
    },
    formatDate (timestamp) {
      const date = new Date(timestamp)
      const day = ((date.getUTCDate() + 1) > 9) ? date.getUTCDate() + 1 : `0${date.getUTCDate() + 1}`
      const month = ((date.getUTCMonth() + 1) > 9) ? date.getUTCMonth() + 1 : `0${date.getUTCMonth() + 1}`

      return `${day}/${month}`
    }
  }
}
</script>

<style scoped lang="scss">
@import "Issues";
@import "../global";
</style>
