<template>
  <div v-if="user" class="dashboard">
    <div class="dashboard-colone">
      <GraphTime
        title="Total usage (256)"
        total="95%"
        subtitle="Usage overtime"
       />
      <List
        title="Projects"
        link="false"
        total="8"
        subtitle="Top 5 Projects"
       />
    </div>
    <div class="dashboard-colone">
      <GraphTime
        title="Detaching rate"
        total="3%"
        subtitle="Detaching overtime"
       />
    </div>
    <div class="dashboard-colone">
      <List
        title="Aliases"
        link="false"
        total="12"
        subtitle="Top 5 Aliases"
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
