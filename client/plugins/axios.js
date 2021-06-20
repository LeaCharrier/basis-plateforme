export default function ({ $axios }, inject) {
  const api = $axios.create()

  // Set baseURL to something different
  api.setBaseURL('https://basis-api.herokuapp.com/api/')
  // api.setBaseURL('http://localhost:5000/api/')

  api.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
  api.defaults.headers.post['Content-Type'] = 'application/json'
  api.defaults.headers.post['Accept-Encoding'] = 'gzip, deflate, br'
  api.defaults.headers.post.Accept = '*/*'
  api.defaults.headers.post['Cache-Control'] = 'no-cache'
  api.defaults.headers.post.Connection = 'keep-alive'

  // Inject to context as $api
  inject('api', api)
}
