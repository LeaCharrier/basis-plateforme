<template>
  <transition v-if="onBoarding && !token" name="fade">
    <div class="popin-container">
      <div class="popin">
        <div class="content" :class="{ 'log-in': login }">
          <div v-if="login" class="popin-contentForm">
            <div>
              <h2 class="txt_title title">
                You, again
              </h2>
              <p class="txt_caption subtitle">
                Connect to Basis to access to your data
              </p>
            </div>

            <div>
              <CustomInput
                ref="login-email"
                label="Email"
                placeholder="sab@gmail.com"
                type="mail"
                :validator="(v) => checkEmail(v)"
                error-msg="Invalid fields"
              />

              <CustomInput
                ref="login-pass"
                label="Password"
                placeholder="*****"
                type="password"
                :validator="(v) => checkString(v, 3)"
                error-msg="Invalid fields"
              />

              <div class="confirm">
                <button class="btn is-blue" @click="handleLogin">
                  <p>
                    Log in
                  </p>
                </button>
                <p v-if="errorLogin === true" class="error">
                  Not all fields are good
                </p>
              </div>
            </div>

            <div>
              <p class="txt_body link">
                Don’t have an account?
                <a href="#" class="link-item" @click="() => switchForm(false)">
                  Sign up
                </a>
              </p>
            </div>
          </div>
          <div v-else class="popin-contentForm">
            <div>
              <h2 class="txt_title title">
                Sign Up
              </h2>
              <p class="txt_caption subtitle">
                Get started with your free account today.
              </p>

              <div class="step1" :class="{ 'is-hidden': step !== 1 }">
                <CustomInput
                  ref="signup-firstname"
                  label="Firstname"
                  placeholder="Sabrina"
                  type="text"
                  :validator="(v) => checkString(v, 0)"
                  error-msg="Invalid fields"
                />
                <CustomInput
                  ref="signup-lastname"
                  label="Lastname"
                  placeholder="Nedjah"
                  type="text"
                  :validator="(v) => checkString(v, 0)"
                  error-msg="Invalid fields"
                />
                <CustomInput
                  ref="signup-email"
                  label="Email"
                  placeholder="sab@gmail.com"
                  type="mail"
                  :validator="(v) => checkEmail(v)"
                  error-msg="Invalid fields"
                />
              </div>
              <div class="step2" :class="{ 'is-hidden': step !== 2 }">
                <CustomInput
                  ref="signup-pass"
                  label="Password"
                  placeholder="***"
                  type="password"
                  :validator="(v) => checkString(v, 3)"
                  error-msg="Invalid fields"
                />
                <CustomInput
                  ref="signup-check"
                  label="Confirm Password"
                  placeholder="***"
                  type="password"
                  :validator="(v) => checkPassDouble(v)"
                  error-msg="Invalid fields"
                />
                <CustomInput
                  ref="signup-api"
                  label="API Key"
                  placeholder="23456787654323456"
                  type="text"
                  :validator="(v) => checkTeam(v, 0)"
                  error-msg="Invalid field"
                />
                <CustomInput
                  ref="signup-team"
                  label="Team ID"
                  placeholder="23456787654323456"
                  type="text"
                  :validator="(v) => checkTeam(v, 0)"
                  error-msg="Invalid field"
                />
                <CustomInput
                  ref="signup-system"
                  label="Design System ID"
                  placeholder="23456787654323456"
                  type="text"
                  :validator="(v) => checkTeam(v, 0)"
                  error-msg="Invalid field"
                />
              </div>
            </div>

            <div>
              <button class="btn is-blue step1" :class="{ 'is-hidden': step !== 1 }" @click="() => changeStep(step+1)">
                <p>
                  Get started
                </p>
              </button>
              <div class="confirm" :class="{ 'is-hidden': step !== 2 }">
                <button class="btn is-blue step2" @click="handleSignUp">
                  <p>
                    Sign Up
                  </p>
                </button>
                <p v-if="errorSignUp === true" class="error">
                  Not all fields are good
                </p>
              </div>
            </div>

            <div>
              <p class="txt_body link">
                Already have an account?
                <a href="#" class="link-item" @click="() => switchForm(true)">
                  Log in
                </a>
              </p>
            </div>
          </div>

          <div class="popin-bgPopin">
            <img src="~assets/img/login.png" class="img-hidden">
            <transition name="fade">
              <img v-if="login" src="~assets/img/login.png" class="img">
            </transition>
            <transition name="fade">
              <img v-if="!login" src="~assets/img/connexion.png" class="img">
            </transition>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CustomInput from '~/components/Fields/Input/Input'

export default {
  name: 'FormPopin',
  components: {
    CustomInput
  },
  data () {
    return {
      step: 1,
      login: true,
      errorLogin: false,
      errorSignUp: false,
      errorTeam: false
    }
  },
  computed: {
    ...mapGetters({
      getToken: 'localStorage/getToken',
      getOnBoarding: 'localStorage/getOnBoarding',
      getUser: 'localStorage/getUser'
    }),
    token () {
      return this.getToken
    },
    user () {
      return this.getUser
    },
    onBoarding () {
      return this.getOnBoarding
    }
  },
  mounted () {
    if (this.token) {
      this.getColorUsage(this.user.team)
    }
  },
  methods: {
    ...mapActions({
      setToken: 'localStorage/setToken'
    }),
    switchForm (val) {
      this.step = 1
      this.login = val
    },
    changeStep (val) {
      if (this.step === 1 && !this.checkStep1()) {
        return false
      }

      this.step = val
    },
    async handleLogin () {
      this.errorLogin = false
      this.errorSignUp = false

      if (!this.checkLogin()) {
        return false
      }

      const email = this.$refs['login-email'].value
      const password = this.$refs['login-pass'].value

      try {
        const res = await this.$api.post('auth/login', {
          email,
          password
        })

        const { token } = res.data
        const team = res.data.user.team

        if (token) {
          this.setToken(token)
          this.getColorUsage(team)
          // eslint-disable-next-line no-console
          console.log('Success', 'Registration Was successful')
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error', err.response)
        this.errorLogin = true
      }
    },
    async handleSignUp () {
      this.errorLogin = false
      this.errorSignUp = false

      if (!(this.checkStep1() && this.checkStep2())) {
        return false
      }

      const lastname = this.$refs['signup-lastname'].value
      const firstname = this.$refs['signup-firstname'].value
      const email = this.$refs['signup-email'].value
      const password = this.$refs['signup-pass'].value
      const team = this.$refs['signup-team'].value
      const api = this.$refs['signup-api'].value
      const system = this.$refs['signup-system'].value

      const teamName = await this.getTeam(team)

      if (!teamName) {
        this.$refs['signup-team'].error = true

        this.errorSignUp = true
        this.errorTeam = true

        return false
      }

      try {
        const res = await this.$api.post('auth/register', {
          lastname,
          firstname,
          email,
          password,
          team,
          api,
          system
        })

        const { token } = res.data

        if (token) {
          this.setToken(token)
          this.getColorUsage(team)
          // eslint-disable-next-line no-console
          console.log('Success', 'Registration Was successful')
        } else {
          // eslint-disable-next-line no-console
          console.error('Error', 'Something Went Wrong')
          this.errorSignUp = true
        }
      } catch (err) {
        const error = err.response
        this.errorSignUp = true
        if (error.status === 409) {
          // eslint-disable-next-line no-console
          console.error('Error', error.data.message)
        } else {
          // eslint-disable-next-line no-console
          console.error('Error', error.data.err.message)
        }
      }
    },
    async getColorUsage (teamId) {
      const api = (this.token && this.user && this.user.api) ? this.user.api : this.$refs['signup-api'].value
      const system = (this.token && this.user && this.user.system) ? this.user.system : this.$refs['signup-system'].value

      const { data } = await this.$api.post(`figma/team/${teamId}/projects/files/`, {
        api
      })

      let jsons = []
      let systemFile = null

      for (const file of data) {
        const response = await this.$api.get(`figma/files/${file.key}?api=${api}`, { api })

        if (response.status === 200 && response.data && response.data.formated && response.data.formated.length) {
          jsons = [...jsons, ...response.data.formated]

          if (file.key === system) {
            systemFile = response.data.raw
          }
        }
      }

      const colors = await this.$api.post(`figma/team/${teamId}/colors`, {
        api,
        system,
        systemFile,
        jsons
      })

      this.$store.commit('usage/save', colors.data)
    },
    async getTeam (teamId) {
      try {
        const res = await this.$api.post(`figma/team/${teamId}/projects/`, {
          api: (this.token && this.user && this.user.api) ? this.user.api : this.$refs['signup-api'].value
        })
        return res.data.name
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        return false
      }
    },
    checkLogin () {
      const emailField = this.$refs['login-email']
      const email = emailField.value
      emailField.handleChange()

      const passField = this.$refs['login-pass']
      const pass = passField.value
      passField.handleChange()

      return this.checkString(pass, 3) && this.checkEmail(email)
    },
    checkStep1 () {
      const lastnameField = this.$refs['signup-lastname']
      const lastname = lastnameField.value
      lastnameField.handleChange()

      const firstnameField = this.$refs['signup-firstname']
      const firstname = firstnameField.value
      firstnameField.handleChange()

      const emailField = this.$refs['signup-email']
      const email = emailField.value
      emailField.handleChange()

      return this.checkString(lastname, 0) && this.checkString(firstname, 0) && this.checkEmail(email)
    },
    checkStep2 () {
      const passField = this.$refs['signup-pass']
      const pass = passField.value
      passField.handleChange()

      const checkField = this.$refs['signup-check']
      const check = checkField.value
      checkField.handleChange()

      const teamField = this.$refs['signup-team']
      const team = teamField.value
      teamField.handleChange()

      const apiField = this.$refs['signup-api']
      const api = apiField.value
      apiField.handleChange()

      const systemField = this.$refs['signup-system']
      const system = systemField.value
      systemField.handleChange()

      return (pass === check) && this.checkString(pass, 3) && this.checkString(team, 0) && this.checkString(api, 0) && this.checkString(system, 0)
    },
    checkString (str, len) {
      return str.length > len
    },
    checkEmail (email) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      return regex.test(String(email).toLowerCase())
    },
    checkPassDouble (double) {
      return this.$refs['signup-pass'].value === double
    },
    checkTeam (str, len) {
      return this.checkString(str, len) && !this.errorTeam
    }
  }
}
</script>

<style scoped lang="scss">
@import "FormPopin";
</style>
