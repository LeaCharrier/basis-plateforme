<template>
  <transition v-if="!onBoarding && !token" name="fade">
    <div class="bgPopin">
      <div class="popin">
        <div class="popin-content">
          <h2 class="title">
            Welcome to Basis !
          </h2>
          <p class="txt_caption description">
            Basis is a <span>design data platform</span> that focuses on helping you reach convergence inside <br> your <span>design system</span>, both in <span>design and code</span>.
          </p>

          <VueSlickCarousel v-bind="settings" class="slider">
            <div class="slider-item">
              <p class="text">
                Gain velocity on each step of the project
              </p>
              <img src="~assets/img/signup.svg" class="img">
            </div>
            <div class="slider-item">
              <p class="text">
                Master your design system from A to Z
              </p>
              <img src="~assets/img/atoz.svg" class="img">
            </div>
            <div class="slider-item">
              <p class="text">
                Reconcile designers and developers
              </p>
              <img src="~assets/img/sign.svg" class="img">
            </div>
          </VueSlickCarousel>
        </div>
        <div class="popin-btn">
          <button class="btn is-blue" @click="closePopin()">
            <p>
              Get started
            </p>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'OnboardingPopin',
  components: {
    VueSlickCarousel
  },
  data () {
    return {
      settings: {
        arrows: false,
        dots: true,
        dotsClass: 'slick-dots dot-img',
        edgeFriction: 0.35,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      },
      isOpen: false
    }
  },
  computed: {
    ...mapGetters({
      getToken: 'localStorage/getToken',
      getOnBoarding: 'localStorage/getOnBoarding'
    }),
    token () {
      return this.getToken
    },
    onBoarding () {
      return this.getOnBoarding
    }
  },
  methods: {
    ...mapActions({
      setOnBoarding: 'localStorage/setOnBoarding'
    }),
    closePopin () {
      this.setOnBoarding(true)
    }
  }
}
</script>

<style scoped lang="scss">
@import "OnboardingPopin";
</style>
