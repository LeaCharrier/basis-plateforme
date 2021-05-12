<template>

  <div class="dropdown">
    <p class="title txt_body">Color mode : </p>

    <div class="select" tabindex="1">
      <input class="selectopt" name="test" type="radio" id="HEXA" checked>
      <label for="HEXA" class="option txt_body">HEXA</label>
      <input class="selectopt" name="test" type="radio" id="RGB">
      <label for="RGB" class="option txt_body">RGB</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown'
}
</script>

<style scoped lang="scss">
@import "Dropdown";
</style>
