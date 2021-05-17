import Vue from 'vue'

Vue.filter('str_replace', (text = '', key, value) => {
  return text.replace(`%${key}%`, value)
})
