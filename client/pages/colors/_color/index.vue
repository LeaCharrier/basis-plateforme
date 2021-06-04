<template>
  <div class="main">
    <Header />
    <div class="container">
      <Aside page="colors" />
      <div class="contentProject" v-if="objectColor && !loading">
        <div class="nav">
          <router-link :to="{ name: 'colors' }" class="backColor" />
          <div class="color">
            <p class="color-title">
              {{ objectColor.name }}
            </p>
            <span class="color-item" :style="'background-color:'+ colorHex" />
          </div>
        </div>
        <DashboardColor :objectColor='objectColor' />
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
    DashboardColor
  },
  mounted () {
    // console.log(this.getColorData('#a4232a'))
    this.colorHex = this.$route.params.color
    // console.log(this.colorHex)
    this.objectColor = this.getColorData(this.colorHex)
    // console.log(this.objectColor)
  },
  data () {
    return {
      loading: false,
      colorHex: null,
      objectColor: null
    }
  },
  computed: {
    ...mapGetters({
      getTexts: 'text/getTexts'
    }),
    texts () {
      return this.getTexts
    },
    colorUsage () {
      return this.$store.state.usage.colors
    }
  },
  methods: {
    getColorData (hexa) {
      const colors = this.$store.state.usage.colors.referenced
      return colors.find(({ hex }) => hex === hexa)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "pages/colors/_color/index";
</style>
