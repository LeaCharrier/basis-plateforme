<template>
  <div v-if="user" class="dashboard">
    <div class="dashboard-colone">
      <GraphTime
        :title="'Total usage (' + objectColor.data.totalUsed +')'"
        :total="Number((objectColor.data.percentUsed).toFixed(1)) + '%'"
        subtitle="Usage overtime"
        :percent="objectColor.data.percentUsed"
      />
      <List
        title="Projects"
        :link="false"
        :total="Number((objectColor.data.projects.length).toFixed(1))"
        :subtitle="'Top ' + objectColor.data.projects.length + ' projects'"
        :objectProject="objectColor.data"
      />
    </div>
    <div class="dashboard-colone">
      <GraphTime
        :title="'Detaching rate (' + objectColor.data.totalDetached +')'"
        :total="Number((objectColor.data.percentDetached).toFixed(1)) + '%'"
        subtitle="Detaching overtime"
        :percent="objectColor.data.percentDetached"
      />
      <List
        title="Aliases"
        :link="false"
        :total="objectColor.data.types.length"
        :subtitle="'Top ' + objectColor.data.types.length +' Aliases'"
        :objectAliases="objectColor.data"
      />
    </div>
    <div class="dashboard-colone">
      <GraphTime
        :title="'Total usage (' + objectColor.data.totalAttached +')'"
        :total="Number((objectColor.data.percentAttached).toFixed(1)) + '%'"
        subtitle="Usage overtime"
        :percent="objectColor.data.percentAttached"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import List from '~/components/Analyses/List/List'
import GraphTime from '~/components/Analyses/GraphTime/GraphTime'

export default {
  name: 'DashboardColor',
  components: {
    List,
    GraphTime
  },
  props: {
    objectColor: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    ...mapGetters({
      getTexts: 'text/getTexts',
      getUser: 'localStorage/getUser'
    }),
    texts () {
      return this.getTexts
    },
    user () {
      return this.getUser
    }
  }
}
</script>

<style scoped lang="scss">
@import "DashboardColor";
</style>
