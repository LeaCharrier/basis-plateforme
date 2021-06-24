<template>
  <div v-if="user" class="dashboard">
    <div class="dashboard-colone">
      <GraphTime
        :title="`% use compared to other colors (${objectColor.data.totalUsed || 0})`"
        :total="Number((objectColor.data.percentUsed || 0).toFixed(1)) + '%'"
        subtitle="Usage overtime"
        :percent="`${objectColor.data.percentUsed || 0}`"
      />
      <List
        title="Projects"
        :link="false"
        :total="Number(((objectColor.data.projects.length || 0)).toFixed(1))"
        :subtitle="'Top ' + (objectColor.data.projects.length || 0) + ' projects'"
        :object-project="objectColor.data"
      />
    </div>
    <div class="dashboard-colone">
      <GraphTime
        :title="`Detaching rate (${objectColor.data.totalDetached || 0})`"
        :total="Number((objectColor.data.percentDetached || 0).toFixed(1)) + '%'"
        subtitle="Detaching overtime"
        :percent="`${objectColor.data.percentDetached || 0}`"
      />
      <List
        title="Aliases"
        :link="false"
        :total="objectColor.data.types.length || 0"
        :subtitle="'Top ' + (objectColor.data.types.length || 0) +' Aliases'"
        :object-aliases="objectColor.data"
      />
    </div>
    <div class="dashboard-colone">
      <GraphTime
        :title="`Total usage (${objectColor.data.totalAttached || 0})`"
        :total="Number((objectColor.data.percentAttached || 0).toFixed(1)) + '%'"
        subtitle="Usage overtime"
        :percent="`${objectColor.data.percentAttached || 0}`"
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
      type: Object,
      required: false,
      default: () => {}
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
