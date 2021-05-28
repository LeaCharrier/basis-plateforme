<template>
  <div class="list block-analyse">
    <div class="list-title">
      <p class="txt_body title">
        {{ title }}
      </p>
    </div>

    <p class="number" :class="{'txt-load-white empty-txt-small': !projects.length}">
      {{ projects.length }}
    </p>

    <div class="items">
      <div v-if="projects.length" class="items-list">
        <a v-for="(project) in projects" :key="project.id" class="item">
          <p class="item-title">{{ project.name }}</p>
          <div v-for="(file) in project.files" :key="file.key" class="item-file">
            <p class="item-fileName">{{ file.name }}</p>
            <p class="item-subtitle">Updated {{ getDate(file.last_modified) }}</p>
          </div>
        </a>
      </div>
      <div v-else class="items-list">
        <a class="item">
          <p class="item-title txt-load-white empty-txt-small">maze.design</p>
          <div class="item-file">
            <p class="item-fileName txt-load-white empty-txt-small">maze.design.file</p>
            <p class="item-subtitle txt-load-white empty-txt-small">Updated 2 days ago</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'Projects',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      projects: []
    }
  },
  async fetch () {
    const teamId = this.user.team
    const res = await this.$api.get(`figma/team/${teamId}/projects/files/`)

    if (res.data && res.data.projects && res.data.projects.length) {
      this.projects = res.data.projects
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'localStorage/getUser'
    }),
    user () {
      return this.getUser
    }
  },
  methods: {
    getDate (date) {
      return moment(date).fromNow()
    }
  }
}
</script>

<style scoped lang="scss">
@import "Projects";
@import "../global";
</style>
