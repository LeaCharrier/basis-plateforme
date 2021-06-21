<template>
  <div class="list block-analyse">
    <div class="list-title">
      <p class="txt_body title">
        {{ title }}
      </p>
    </div>

    <div class="graph">
      <div class="flex">
        <p class="number" :class="{'txt-load-white empty-txt-small': loading}">
          {{ totalDesigners }}
        </p>
        <p class="number" :class="{'txt-load-white empty-txt-small': loading}">
          {{ totalViewers }}
        </p>
      </div>
      <div class="graph-item" :class="{'txt-load-white empty-txt-small': loading}">
        <div class="jauge jauge-designers" style="width: 100%" />
        <div class="jauge jauge-viewers" :style="'width: ' + totalViewers + '0%'" />
      </div>
      <div class="flex graph-infos">
        <p class="title title-designer" :class="{'txt-load-white empty-txt-small': loading}">
          Designers
        </p>
        <p class="title title-viewers" :class="{'txt-load-white empty-txt-small': loading}">
          Viewers
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Team',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      totalDesigners: 0,
      totalViewers: 0
    }
  },
  fetch () {
    this.getData()
  },
  computed: {
    ...mapGetters({
      getUser: 'localStorage/getUser'
    }),
    user () {
      return this.getUser
    }
  },
  watch: {
    user () {
      this.getData()
    },
    $route () {
      this.getData()
    }
  },
  methods: {
    getData () {
      this.loading = true
      this.$api.get(`auth/team/${this.user.team}`)
        .then((res) => {
          this.loading = false

          if (res && res.data) {
            this.totalDesigners = res.data.length
          }
        })
        .catch((e) => {
          this.loading = false
          // eslint-disable-next-line no-console
          console.log(e)
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import "Team";
@import "../global";
</style>
