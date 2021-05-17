<template>
  <div class="connected">
    <div v-show="tab === 'Sources'" class="connected-container">
      <div class="content">
        <p class="txt_body title">
          {{ texts.CONNECTED_SOURCES_TITLE }}
        </p>
        <div v-for="(item, i) in texts.CONNECTED_SOURCES" :id="item.title" :key="`number-${i}`" class="tab-pane">
          <div class="item">
            <img :src="`~assets/img/${item.img}`" alt="logo" class="img">
            <p class="name">
              {{ item.title }}
            </p>
          </div>
        </div>
      </div>
      <div class="content">
        <p class="txt_body title">
          {{ texts.CONNECTED_SOURCES_SOON_TITLE }}
        </p>
        <div v-for="(item, i) in texts.CONNECTED_SOON_SOURCES" :id="item.title" :key="`number-${i}`" class="tab-pane">
          <div class="flex" :class="{ 'border-top' : i >= 1}">
            <div class="item">
              <img :src="'~assets/img/' + item.img" alt="logo" class="img">
              <p class="name">
                {{ item.title }}
              </p>
            </div>
            <p class="tag">
              Coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-show="tab === 'Destinations'">
      <div class="content">
        <p class="txt_body title">
          {{ texts.CONNECTED_DESTINATIONS_SOON_TITLE }}
        </p>
        <div v-for="(item, i) in texts.CONNECTED_SOON_DESTINATIONS" :id="item.title" :key="`number-${i}`" class="tab-pane">
          <div class="flex" :class="{ 'border-top' : i >= 1}">
            <div class="item">
              <img :src="'~assets/img/' + item.img" alt="logo" class="img">
              <p class="name">
                {{ item.title }}
              </p>
            </div>
            <p class="tag">
              Coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-show="tab === 'Integrations'">
      <div class="content">
        <p class="txt_body title">
          {{ texts.CONNECTED_INTEGRATIONS_SOON_TITLE }}
        </p>
        <div v-for="(item, i) in texts.CONNECTED_SOON_INTEGRATIONS" :id="item.title" :key="`number-${i}`" class="tab-pane">
          <div class="flex" :class="{ 'border-top' : i >= 1}">
            <div class="item">
              <img :src="'~assets/img/' + item.img" alt="logo" class="img">
              <p class="name">
                {{ item.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BlockConnected',
  props: {
    tab: {
      type: String,
      required: true
    }
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
@import "BlockConnected";
</style>
