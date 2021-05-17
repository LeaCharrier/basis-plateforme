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
              <CustomInput ref="login-email" label="Email" placeholder="sab@gmail.com" type="mail" />
              <CustomInput ref="login-pass" label="Password" placeholder="*****" type="password" />

              <button class="btn is-blue" @click="handleLogin">
                <p>
                  Log in
                </p>
              </button>
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
                <CustomInput ref="signup-firstname" label="Firstname" placeholder="Sabrina" type="text" />
                <CustomInput ref="signup-lastname" label="Lastname" placeholder="Nedjah" type="text" />
                <CustomInput ref="signup-email" label="Email" placeholder="sab@gmail.com" type="mail" />
              </div>
              <div class="step2" :class="{ 'is-hidden': step !== 2 }">
                <CustomInput ref="signup-pass" label="Password" placeholder="***" type="password" />
                <CustomInput ref="signup-check" label="Confirm Password" placeholder="***" type="password" />
                <CustomInput ref="signup-team" label="Team ID" placeholder="23456787654323456" type="text" />
              </div>
            </div>

            <div>
              <button class="btn is-blue step1" :class="{ 'is-hidden': step !== 1 }" @click="() => changeStep(step+1)">
                <p>
                  Get started
                </p>
              </button>
              <button class="btn is-blue step2" :class="{ 'is-hidden': step !== 2 }" @click="handleSignUp">
                <p>
                  Sign Up
                </p>
              </button>
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
      login: true
    }
  },
  computed: {
    ...mapGetters({
      getToken: 'localStorage/getToken',
      getOnBoarding: 'localStorage/getOnBoarding'
    }),
    token () {
      return this.getToken
    },
    onBoarding () {
      return this.getOnBoarding
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

        if (token) {
          this.setToken(token)
          // eslint-disable-next-line no-console
          console.log('Success', 'Registration Was successful')
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error', err.response)
      }
    },
    async handleSignUp () {
      if (!(this.checkStep1() && this.checkStep2())) {
        return false
      }

      const lastname = this.$refs['signup-lastname'].value
      const firstname = this.$refs['signup-firstname'].value
      const email = this.$refs['signup-email'].value
      const password = this.$refs['signup-pass'].value
      const team = this.$refs['signup-team'].value

      try {
        const res = await this.$api.post('auth/register', {
          lastname,
          firstname,
          email,
          password,
          team
        })

        const { token } = res.data

        if (token) {
          this.setToken(token)
          // eslint-disable-next-line no-console
          console.log('Success', 'Registration Was successful')
        } else {
          // eslint-disable-next-line no-console
          console.error('Error', 'Something Went Wrong')
        }
      } catch (err) {
        const error = err.response
        if (error.status === 409) {
          // eslint-disable-next-line no-console
          console.error('Error', error.data.message)
        } else {
          // eslint-disable-next-line no-console
          console.error('Error', error.data.err.message)
        }
      }
    },
    checkLogin () {
      const email = this.$refs['login-email'].value
      const pass = this.$refs['login-pass'].value

      return this.checkString(pass, 3) && this.checkEmail(email)
    },
    checkStep1 () {
      const lastname = this.$refs['signup-lastname'].value
      const firstname = this.$refs['signup-firstname'].value
      const email = this.$refs['signup-email'].value

      return this.checkString(lastname, 0) && this.checkString(firstname, 0) && this.checkEmail(email)
    },
    checkStep2 () {
      const pass = this.$refs['signup-pass'].value
      const check = this.$refs['signup-check'].value
      const team = this.$refs['signup-team'].value

      return (pass === check) && this.checkString(pass, 3) && this.checkString(team, 0)
    },
    checkString (str, len) {
      return str.length > len
    },
    checkEmail (email) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      return regex.test(String(email).toLowerCase())
    }
  }
}
</script>

<style scoped lang="scss">
@import "FormPopin";
</style>
