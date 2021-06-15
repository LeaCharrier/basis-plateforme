export default function ({ $axios }, inject) {
  const api = $axios.create()

  // Set baseURL to something different
  api.setBaseURL('http://basis-api.herokuapp.com/api/')

  // Inject to context as $api
  inject('api', api)
}
