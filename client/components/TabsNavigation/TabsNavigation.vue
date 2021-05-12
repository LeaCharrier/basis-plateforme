<template>
  <div>
    <div class="tabs">
      <div class="tabs-item is-active">
        <p class="txt_body">Global</p>
      </div>
      <div class="tabs-item">
        <p class="txt_body">Design</p>
      </div>
    </div>

    <!-- <ul class="nav nav-tabs nav-justified">
      <li class="nav-item">
        <a class="nav-link" @click.prevent="setActive('home')" :class="{ active: isActive('home') }" href="#home">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click.prevent="setActive('profile')" :class="{ active: isActive('profile') }" href="#profile">Profile</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click.prevent="setActive('contact')" :class="{ active: isActive('contact') }" href="#contact">Contact</a>
      </li>
    </ul>
    <div class="tab-content py-3" id="myTabContent">
      <div class="tab-pane fade" :class="{ 'active show': isActive('home') }" id="home">Home content</div>
      <div class="tab-pane fade" :class="{ 'active show': isActive('profile') }" id="profile">Profile content</div>
      <div class="tab-pane fade" :class="{ 'active show': isActive('contact') }" id="contact">Contact content</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'TabsNavigation'
  // data: () => {
  //   return {
  //     activeItem: 'home'
  //   }
  // },
  // methods: {
  //   isActive (menuItem) {
  //     return this.activeItem === menuItem
  //   },
  //   setActive (menuItem) {
  //     this.activeItem = menuItem
  //   }
  // }
}
</script>

<style scoped lang="scss">
@import "TabsNavigation";
</style>
