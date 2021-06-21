export default function ({ $axios }, inject) {
  const api = $axios.create()

  // Set baseURL to something different
  api.setBaseURL('http://localhost:5000/api/')

  // Inject to context as $api
  inject('api', api)
}
