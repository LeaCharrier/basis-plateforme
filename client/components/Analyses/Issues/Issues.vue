<template>
  <div class="list block-analyse">
      <div class="list-title">
        <p class="txt_body title">
          {{ title }}
        </p>
        <router-link :to="{ name: 'issues' }" class="txt_caption link">
          View all
        </router-link>
      </div>

      <p class="number">
        {{ total }}
      </p>

      <div class="items">
          <p class="items-title txt_caption">
            {{ subtitle }}
          </p>
          <div class="items-list items-issues">
              <div class="item">
                <p class="item-title issue-done">Done</p>
                <p class="item-data">84</p>
              </div>
              <div class="item">
                <p class="item-title issue-cancelled">Cancelled</p>
                <p class="item-data">20</p>
              </div>
              <div class="item">
                <p class="item-title issue-backlog">Backlog</p>
                <p class="item-data">17</p>
              </div>
          </div>
      </div>

      <div class="items last-issue" v-if="lastIssues === 'true'">
          <p class="items-title txt_caption">
            Latest Issues
          </p>
          <div class="items-list link">
              <div class="item">
                <p class="item-title">Remove unused h1 mobile style</p>
                <p class="item-info txt_caption">#47 opened on 14/06 by sabnjdh</p>
              </div>
              <div class="item">
                <p class="item-title">Remove unused h1 mobile style</p>
                <p class="item-info txt_caption">#47 opened on 14/06 by sabnjdh</p>
              </div>
              <div class="item">
                <p class="item-title">Remove unused h1 mobile style</p>
                <p class="item-info txt_caption">#47 opened on 14/06 by sabnjdh</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Issues',
  props: {
    title: {
      type: String,
      required: true
    },
    lastIssues: {
      type: String,
      required: true
    },
    total: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "Issues";
@import "../global";
</style>
