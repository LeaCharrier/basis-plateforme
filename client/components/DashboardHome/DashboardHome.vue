<template>
  <div class="dashboard" v-if="user">
    <div class="dashboard-colone">
      <List
        title="Total colors on the library"
        link="true"
        total="192"
        subtitle="Top 3 colors"
       />
       <List
        title="Total components"
        link="false"
        total="142"
        subtitle="By projects"
       />
       <Date
        title="Json Updated"
        total="12"
        subtitle="Last update"
        date="20/06/2021"
       />
    </div>
    <div class="dashboard-colone">
      <Issues
        title="Current issues"
        total="27"
        subtitle="Issues overtime"
        lastIssues="true"
       />
    </div>
    <div class="dashboard-colone">
      <!-- total designers mettre le nombre de personne connecté sur le team id du figma -->
      <Team
        title="Team members"
        totalDesigners="1"
        totalViewers="0"
       />

      <!-- mettre le chiffre entre parenthèse -->
      <Pourcentage
        title="Referenced colors (256)"
        totalUsed="179"
        totalUnused="77"
        pourcentageUsed="70"
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
import Date from '~/components/Analyses/Date/Date'
import Issues from '~/components/Analyses/Issues/Issues'
import Team from '~/components/Analyses/Team/Team'
import Pourcentage from '~/components/Analyses/Pourcentage/Pourcentage'
import Projects from '~/components/Analyses/Projects/Projects'

export default {
  name: 'DashboardHome',
  components: {
    List,
    Date,
    Issues,
    Team,
    Pourcentage,
    Projects
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
@import "DashboardHome";
</style>
