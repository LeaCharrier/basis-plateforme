export const state = () => ({
  colors: {}
})

export const mutations = {
  save (state, usage) {
    state.colors = usage
    console.log(state.colors)
  }
}

// export const getters = {
//   getColorData (state, hexa) {
//     return state.colors.referenced.find(({ hex }) => hex === hexa)
//   }
// }
