export default function ({ $axios }, inject) {
  const api = $axios.create()

  // Set baseURL to something different
  api.setBaseURL('https://basis-api.herokuapp.com/api/')
  // api.setBaseURL('http://localhost:5000/api/')

  api.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
  api.defaults.headers.get['Access-Control-Allow-Origin'] = '*'

  // Inject to context as $api
  inject('api', api)
}
