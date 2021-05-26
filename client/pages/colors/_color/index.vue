<template>
  <div class="main">
    <Header />
    <div class="container">
      <Aside page="colors" />
      <div class="contentProject">
        <div class="nav">
            <router-link :to="{ name: 'colors' }" class="backColor"></router-link>
            <div class="color">
                <p class="color-title"> Blue - 500</p>
                <span class="color-item" style="background-color: #0568FD" />
            </div>
        </div>
        <DashboardColor />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/Header/Header'
import Aside from '~/components/Aside/Aside'
import DashboardColor from '~/components/DashboardColor/DashboardColor'

export default {
  name: 'Colors',
  components: {
    Header,
    Aside,
    // BlockTitleDesc,
    DashboardColor
  },
  computed: {
    ...mapGetters({
      getTexts: 'text/getTexts'
    }),
    texts () {
      return this.getTexts
    }
  }
}
</script>

<style scoped lang="scss">
  @import "index";
</style>
