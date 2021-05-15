<template>
  <form class="form">
    <div class="form-content">
      <div class="form-column">
        <Input label="Email" placeholder="sab@gmail.com" type="text" />
        <Input label="First Name" placeholder="Léa" type="text" />
        <Input label="Team ID" placeholder="23456789" type="text" />
      </div>
      <div class="form-column">
        <Input label="Old password" placeholder="****" type="password" />
        <Input label="New Password" placeholder="****" type="password" />
        <Input label="Confirm Password" placeholder="****" type="password" />
      </div>
    </div>

    <button class="btn is-blue">
      Update my info
    </button>
  </form>
</template>

<script>
import Input from '~/components/Fields/Input/Input'

export default {
  name: 'FormUpdateUser',
  components: {
    Input
  }
}
</script>

<style scoped lang="scss">
@import "FormUpdateUser";
</style>
