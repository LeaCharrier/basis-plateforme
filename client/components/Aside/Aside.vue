<template>
  <aside>
    <h2 class="design-title txt_body" :class="{'txt-load-dark empty-txt-small': !name, 'hidden-label': (!loading && !name)}">
      {{ name ? name : 'name' }} Design System
    </h2>
    <p class="design-subtitle txt_note" :class="{'txt-load-dark empty-txt-small': !name, 'hidden-label': (!loading && !name)}">
      {{ getName(name) }}/design-system
    </p>

    <div class="groupes">
      <h3 class="groupes-title txt_caption">
        Overview
      </h3>
      <div class="groupes-items">
        <router-link :class="[page === 'dashboard' ? 'is-active' : '']" :to="{ name: 'index' }" class="item txt_body icon-dash">
          Dashboard
        </router-link>
        <router-link :class="[page === 'issue' ? 'is-active' : '']" :to="{ name: 'issues' }" class="item txt_body icon-issue">
          Issues
        </router-link>
      </div>

      <h3 class="groupes-title txt_caption">
        Design tokens
      </h3>
      <div class="groupes-items">
        <router-link :class="[page === 'colors' ? 'is-active' : '']" :to="{ name: 'colors' }" class="item txt_body icon-color">
          Colors
        </router-link>
        <div class="item txt_body icon-type item-soon">
          Type
          <span class="tag">
            Coming soon
          </span>
        </div>
        <div class="item txt_body icon-grid item-soon">
          Grids
          <span class="tag">
            Coming soon
          </span>
        </div>
        <div class="item txt_body icon-spacing item-soon">
          Spacings
          <span class="tag">
            Coming soon
          </span>
        </div>
        <div class="item txt_body icon-shadow item-soon">
          Shadows
          <span class="tag">
            Coming soon
          </span>
        </div>
        <div class="item txt_body icon-animation item-soon">
          Animation
          <span class="tag">
            Coming soon
          </span>
        </div>
      </div>

      <h3 class="groupes-title txt_caption">
        Aliases
      </h3>
      <div class="groupes-items">
        <div class="item txt_body icon-action item-soon">
          Action
          <span class="tag">
            Coming soon
          </span>
        </div>
        <div class="item txt_body icon-text item-soon">
          Text
          <span class="tag">
            Coming soon
          </span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'
import slugify from 'slugify'

export default {
  name: 'Aside',
  props: {
    page: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      name: '',
      loading: false
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
    }
  },
  methods: {
    getName () {
      return slugify(this.name.toLowerCase())
    },
    getData () {
      this.loading = true

      const teamId = (this.user) ? this.user.team : null

      if (teamId) {
        const config = {
          headers: { Authorization: `Bearer ${this.user.token}` }
        }

        this.$api.get(`figma/team/${teamId}/projects/`, config)
          .then((res) => {
            this.loading = false

            if (res.data && res.data.name) {
              this.name = res.data.name
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
}
</script>

<style scoped lang="scss">
@import "Aside";
</style>
