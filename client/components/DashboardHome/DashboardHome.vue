<template>
  <div v-if="user && colorUsage.data && !loading" class="dashboard">
    <div class="dashboard-colone">
      <List
        title="Total colors on the library"
        link="true"
        total="192"
        subtitle="Top 3 colors used"
        :double="true"
        subtitle2="Top 3 colors DETACHED"
      />
      <!-- <Date
        title="Json Updated"
        total="12"
        subtitle="Last update"
        date="20/06/2021"
      /> -->
    </div>
    <div class="dashboard-colone">
      <Issues
        title="Current issues"
        total="27"
        subtitle="Issues overtime"
        last-issues="true"
      />
    </div>
    <div class="dashboard-colone">
      <!-- total designers mettre le nombre de personne connecté sur le team id du figma -->
      <Team
        title="Team members"
        total-designers="1"
        total-viewers="0"
      />

      <!-- mettre le chiffre entre parenthèse -->
      <Pourcentage
        :title="'Referenced colors (' + colorUsage.data.totalReferenced + ')'"
        :total-used="colorUsage.data.totalReferencedUsed"
        :total-unused="colorUsage.data.totalUnreferencedUsed"
        :pourcentage-used="colorUsage.data.percentReferenced"
      />

      <Projects
        title="Total projects"
        total="3"
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
      getUser: 'localStorage/getUser'
    }),
    texts () {
      return this.getTexts
    },
    user () {
      return this.getUser
    },
    colorUsage () {
      return this.$store.state.usage.colors
    }
  }
}
</script>

<style scoped lang="scss">
@import "DashboardHome";
</style>
