<template>
  <div class="dashboard">
    <div class="dashboard-colone">
      <List
        title="Total colors on the library"
        :link="true"
        :total="(!loading && colorUsage && colorUsage.baseColor && colorUsage.baseColor.length) ? colorUsage.baseColor.length : 0"
        subtitle="Top 3 colors used"
        :object1="(!loading && colorUsage && colorUsage.data && colorUsage.data.mostAttached) ? colorUsage.data.mostAttached : []"
        :object2="(!loading && colorUsage && colorUsage.data && colorUsage.data.mostDetached) ? colorUsage.data.mostDetached : []"
        :double="true"
        subtitle2="Top 3 colors DETACHED"
        :loading="loading"
      />
    </div>
    <div class="dashboard-colone">
      <Issues
        title="Current issues"
        subtitle="Issues overtime"
      />
    </div>
    <div class="dashboard-colone">
      <Pourcentage
        :title="`Referenced colors (${(!loading && colorUsage && colorUsage.data && colorUsage.data.totalReferenced) ? colorUsage.data.totalReferenced : 0})`"
        :total-used="(!loading && colorUsage && colorUsage.data && colorUsage.data.totalReferencedUsed) ? colorUsage.data.totalReferencedUsed : 0"
        :total-unused="(!loading && colorUsage && colorUsage.data && colorUsage.data.totalUnreferencedUsed) ? colorUsage.data.totalUnreferencedUsed : 0"
        :pourcentage-used="(!loading && colorUsage && colorUsage.data && colorUsage.data.percentReferenced) ? Math.round(colorUsage.data.percentReferenced) : 0"
        :loading="loading"
      />
      <Projects
        title="Total projects"
      />
      <Team
        title="Team members"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import List from '~/components/Analyses/List/List'
// import Date from '~/components/Analyses/Date/Date'
import Issues from '~/components/Analyses/Issues/Issues'
import Team from '~/components/Analyses/Team/Team'
import Pourcentage from '~/components/Analyses/Pourcentage/Pourcentage'
import Projects from '~/components/Analyses/Projects/Projects'

export default {
  name: 'DashboardHome',
  components: {
    List,
    // Date,
    Issues,
    Team,
    Pourcentage,
    Projects
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      getTexts: 'text/getTexts',
      getUser: 'localStorage/getUser',
      getColors: 'usage/getColors'
    }),
    texts () {
      return this.getTexts
    },
    user () {
      return this.getUser
    },
    colorUsage () {
      return this.getColors
    }
  },
  watch: {
    colorUsage () {
      this.loading = !this.colorUsage.data
    }
  },
  mounted () {
    this.loading = !this.colorUsage.data
  }
}
</script>

<style scoped lang="scss">
@import "DashboardHome";
</style>
