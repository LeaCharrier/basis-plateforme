<template>
  <form v-if="user" class="form">
    <div class="form-content">
      <div class="form-column">
        <CustomInput
          ref="update-email"
          label="Email"
          :model="user.email"
          type="mail"
          :validator="(v) => checkEmail(v)"
          error-msg="Champs invalide"
        />
        <CustomInput
          ref="update-firstname"
          label="Firstname"
          :model="user.firstname"
          type="text"
          :validator="(v) => checkString(v, 3)"
          error-msg="Champs invalide"
        />
        <CustomInput
          ref="update-lastname"
          label="Lastname"
          :model="user.lastname"
          type="text"
          :validator="(v) => checkString(v, 3)"
          error-msg="Champs invalide"
        />
        <CustomInput
          ref="update-team"
          label="Team ID"
          :model="user.team"
          type="text"
          :validator="(v) => checkString(v, 0)"
          error-msg="Champs invalide"
        />
      </div>
      <div class="form-column">
        <CustomInput
          ref="update-passOld"
          label=" Old Password"
          placeholder="***"
          type="password"
          :validator="(v) => checkString(v, 3)"
          error-msg="Champs invalide"
        />
        <CustomInput
          ref="update-pass"
          label="New password"
          placeholder="***"
          type="password"
          :validator="(v) => checkString(v, 3)"
          error-msg="Champs invalide"
        />
        <CustomInput
          ref="update-check"
          label="Confirm Password"
          placeholder="***"
          type="password"
          :validator="(v) => checkPassDouble(v)"
          error-msg="Champs invalide"
        />
      </div>
    </div>

    <button class="btn is-blue" @click="handleUser">
      Update my info
    </button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CustomInput from '~/components/Fields/Input/Input'

export default {
  name: 'FormUpdateUser',
  components: {
    CustomInput
  },
  computed: {
    ...mapGetters({
      getToken: 'localStorage/getToken',
      getTexts: 'text/getTexts',
      getUser: 'localStorage/getUser'
    }),
    token () {
      return this.getToken
    },
    texts () {
      return this.getTexts
    },
    user () {
      return this.getUser
    }
  },
  methods: {
    ...mapActions({
      setToken: 'localStorage/setToken'
    }),
    // eslint-disable-next-line require-await
    async handleUser (e) {
      if (!this.checkUpdate()) {
        return false
      }

      e.preventDefault()
      // const lastname = this.$refs['update-lastname'].value
      // const firstname = this.$refs['update-firstname'].value
      // const email = this.$refs['update-email'].value
      // const password = this.$refs['update-check'].value
      // const team = this.$refs['update-team'].value

      // try {
      //   const res = await this.$api.post('auth/register', {
      //     lastname,
      //     firstname,
      //     email,
      //     password,
      //     team
      //   })

      //   const { token } = res.data

      //   if (token) {
      //     console.log(res)
      //     // this.setToken(token)
      //     // eslint-disable-next-line no-console
      //     console.log('Success', 'Registration Was successful')
      //   } else {
      //     // eslint-disable-next-line no-console
      //     console.error('Error', 'Something Went Wrong')
      //   }
      // } catch (err) {
      //   const error = err.response
      //   if (error.status === 409) {
      //     // eslint-disable-next-line no-console
      //     console.error('Error', error.data.message)
      //   } else {
      //     // eslint-disable-next-line no-console
      //     console.error('Error', error.data.err.message)
      //   }
      // }
    },
    checkUpdate () {
      const lastnameField = this.$refs['update-lastname']
      const lastname = lastnameField.value
      lastnameField.handleChange()

      const firstnameField = this.$refs['update-firstname']
      const firstname = firstnameField.value
      firstnameField.handleChange()

      const emailField = this.$refs['update-email']
      const email = emailField.value
      emailField.handleChange()

      // const oldpassField = this.$refs['update-passOld']
      // const oldpass = oldpassField.value
      // oldpassField.handleChange()

      const passField = this.$refs['update-pass']
      const pass = passField.value
      passField.handleChange()

      const checkField = this.$refs['update-check']
      const check = checkField.value
      checkField.handleChange()

      const teamField = this.$refs['update-team']
      const team = teamField.value
      teamField.handleChange()

      return this.checkString(firstname, 0) && this.checkString(lastname, 0) && this.checkEmail(email) && (pass === check) && this.checkString(pass, 3) && this.checkString(team, 0)
    },
    checkString (str, len) {
      return str.length > len
    },
    checkEmail (email) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      return regex.test(String(email).toLowerCase())
    },
    checkPassDouble (double) {
      return this.$refs['update-pass'].value === double
    }
  }
}

</script>

<style scoped lang="scss">
@import "FormUpdateUser";
</style>
