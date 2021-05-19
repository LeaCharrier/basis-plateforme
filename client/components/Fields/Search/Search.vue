<template>
  <div class="searchBar">
    <form class="searchBar-form">
      <button class="searchBar-button" type="submit" />
      <input type="search" :placeholder="placeholder" class="searchBar-input">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    placeholder: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "Search";
</style>
