export const state = () => ({
  colors: {}
})

export const mutations = {
  save (state, usage) {
    state.colors = usage
    console.log(state.colors)
  }
}
