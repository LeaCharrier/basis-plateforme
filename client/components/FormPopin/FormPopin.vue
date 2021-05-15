<template>
  <div class="popin">
    <!-- SIGN UP -->
    <div v-if="popin == 'sign-up'" class="content">
      <div class="popin-contentForm">
        <div>
          <h2 class="txt_title title">Sign Up</h2>
          <p class="txt_caption subtitle">Get started with your free account today.</p>

          <div class="step1">
            <Input label="Name" placeholder="Nedjah" type="text" />
            <Input label="Firstname" placeholder="Sabrina" type="text" />
            <Input label="Email" placeholder="sab@gmail.com" type="mail" />
          </div>
          <div class="step2 is-hidden">
            <Input label="Password" placeholder="***" type="password" />
            <Input label="Confirm Password" placeholder="***" type="password" />
            <Input label="Team ID" placeholder="23456787654323456" type="number" />
          </div>
        </div>

        <div>
          <button class="btn is-blue step1" @click="changeStep">
            <p>
              Get started
            </p>
          </button>
          <button class="btn is-blue step2 is-hidden">
            <p>
              Sign Up
            </p>
          </button>
        </div>

        <div>
          <p class="txt_body link">
            Already have an account?
            <router-link class="link-item" :to="{ name: 'log-in' }">
              Log in
            </router-link>
          </p>
        </div>
      </div>
      <div class="popin-bgPopin">
        <img src="~assets/img/connexion.png" class="img" />
      </div>
    </div>

    <!-- LOG IN -->
    <div v-if="popin == 'log-in'" class="content log-in">
      <div class="popin-contentForm">
        <div>
          <h2 class="txt_title title">You, again</h2>
          <p class="txt_caption subtitle">Connect to Basis to access to your data</p>
        </div>

        <div>
          <Input label="Email" placeholder="sab@gmail.com" type="mail" />
          <Input label="Password" placeholder="*****" type="password" />

          <button class="btn is-blue">
            <p>
              Log in
            </p>
          </button>
        </div>

        <div>
          <p class="txt_body link">
            Don’t have an account?
            <router-link class="link-item" :to="{ name: 'sign-up' }">
              Sign up
            </router-link>
          </p>
        </div>
      </div>
      <div class="popin-bgPopin">
        <img src="~assets/img/login.png" class="img" />
      </div>
    </div>
  </div>
</template>

<script>
import Input from '~/components/Fields/Input/Input'

export default {
  name: 'FormPopin',
  components: {
    Input
  },
  props: {
    popin: {
      type: String,
      required: false
    }
  },
  methods: {
    changeStep (e) {
      e.preventDefault()
      const step1 = document.getElementsByClassName('step1')
      const step2 = document.getElementsByClassName('step2')

      for (let n = 0; n < step1.length; n++) {
        step1[n].classList.add('is-hidden')
      }
      for (let l = 0; l < step2.length; l++) {
        step2[l].classList.remove('is-hidden')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "FormPopin";
</style>
