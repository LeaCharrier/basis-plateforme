<template>
  <form v-if="user" class="form">
    <div class="form-content">
      <div class="form-column">
        <CustomInput
          ref="update-email"
          label="Email"
          :base-value="user.email"
          type="mail"
          :validator="(v) => checkEmail(v)"
          error-msg="Invalid fields"
        />
        <CustomInput
          ref="update-firstname"
          label="Firstname"
          :base-value="user.firstname"
          type="text"
          :validator="(v) => checkString(v, 3)"
          error-msg="Invalid fields"
        />
        <CustomInput
          ref="update-lastname"
          label="Lastname"
          :base-value="user.lastname"
          type="text"
          :validator="(v) => checkString(v, 3)"
          error-msg="Invalid fields"
        />
        <!-- <CustomInput
          ref="update-team"
          label="Team ID"
          :base-value="user.team"
          type="text"
          :validator="(v) => checkString(v, 0)"
          error-msg="Invalid fields"
        /> -->
      </div>
      <div class="form-column">
        <CustomInput
          ref="update-passOld"
          label=" Old Password"
          placeholder="***"
          type="password"
          :validator="(v) => checkOldPass(v)"
          error-msg="Invalid fields"
        />
        <CustomInput
          ref="update-pass"
          label="New password"
          placeholder="***"
          type="password"
          :validator="(v) => checkString(v, 3)"
          error-msg="Invalid fields"
        />
        <CustomInput
          ref="update-check"
          label="Confirm Password"
          placeholder="***"
          type="password"
          :validator="(v) => checkPassDouble(v)"
          error-msg="Invalid fields"
        />
      </div>
    </div>

    <button class="btn is-blue" @click="handleUser">
      Update my info
    </button>

    <p v-if="errorUpdate === true" class="error">
      Not all fields are good
    </p>
    <p v-if="validUpdate === true" class="valid">
      Your account is update
    </p>
  </form>
</template>

<script>
import bcrypt from 'bcryptjs'
import { mapActions, mapGetters } from 'vuex'
import CustomInput from '~/components/Fields/Input/Input'

export default {
  name: 'FormUpdateUser',
  components: {
    CustomInput
  },
  data () {
    return {
      errorUpdate: false,
      validUpdate: false
    }
  },
  computed: {
    ...mapGetters({
      getToken: 'localStorage/getToken',
      getTexts: 'text/getTexts',
      getUser: 'localStorage/getUser',
      getHeaders: 'localStorage/getHeaders'
    }),
    token () {
      return this.getToken
    },
    texts () {
      return this.getTexts
    },
    headers () {
      return this.getHeaders
    },
    user () {
      return this.getUser
    }
  },
  methods: {
    ...mapActions({
      setToken: 'localStorage/setToken'
    }),
    async handleUser (e) {
      this.errorUpdate = false
      this.validUpdate = false
      if (!this.checkUpdate() && !(await this.needUpdatePass())) {
        return false
      }

      e.preventDefault()
      const lastname = this.$refs['update-lastname'].value
      const firstname = this.$refs['update-firstname'].value
      const email = this.$refs['update-email'].value
      const password = this.$refs['update-check'].value
      // const team = this.$refs['update-team'].value

      try {
        const body = {
          lastname,
          firstname,
          email,
          password,
          // team,
          id: this.user._id
        }

        if (await this.needUpdatePass()) {
          body.password = password
        }

        const res = await this.$api.put('auth/update', body, this.headers)

        const { token } = res.data

        this.resetFields()

        if (token) {
          // console.log(res)
          this.setToken(token)
          // eslint-disable-next-line no-console
          console.log('Success', 'Registration Was successful')
          this.validUpdate = true
        } else {
          // eslint-disable-next-line no-console
          console.error('Error', 'Something Went Wrong')
          this.errorUpdate = true
        }
      } catch (err) {
        this.resetFields()
        const error = err.response
        // eslint-disable-next-line no-console
        console.error('Error', error)
        this.errorUpdate = true
      }
    },
    checkUpdate () {
      this.validUpdate = false
      const lastnameField = this.$refs['update-lastname']
      const lastname = lastnameField.value
      lastnameField.handleChange()

      const firstnameField = this.$refs['update-firstname']
      const firstname = firstnameField.value
      firstnameField.handleChange()

      const emailField = this.$refs['update-email']
      const email = emailField.value
      emailField.handleChange()

      // const teamField = this.$refs['update-team']
      // const team = teamField.value
      // teamField.handleChange()

      return (
        this.checkString(firstname, 0) &&
        this.checkString(lastname, 0) &&
        this.checkEmail(email)
        // this.checkString(team, 0)
      )
    },
    async needUpdatePass () {
      this.validUpdate = false
      const oldPass = this.$refs['update-passOld'].value
      const pass = this.$refs['update-pass'].value
      const check = this.$refs['update-check'].value

      const checkOldPass = await bcrypt.compare(oldPass, this.user.password)

      return (
        oldPass.length &&
        pass.length &&
        check.length &&
        pass === check &&
        oldPass !== pass &&
        oldPass !== check &&
        checkOldPass
      )
    },
    resetFields () {
      this.validUpdate = false
      this.$refs['update-passOld'].resetValue()
      this.$refs['update-pass'].resetValue()
      this.$refs['update-check'].resetValue()
    },
    checkString (str, len) {
      this.validUpdate = false
      return str.length > len
    },
    checkEmail (email) {
      this.validUpdate = false
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      return regex.test(String(email).toLowerCase())
    },
    async checkOldPass (pass) {
      this.validUpdate = false
      return !!(await bcrypt.compare(pass, this.user.password))
    },
    checkPassDouble (double) {
      this.validUpdate = false
      return this.$refs['update-pass'].value === double
    }
  }
}

</script>

<style scoped lang="scss">
@import "FormUpdateUser";
</style>
