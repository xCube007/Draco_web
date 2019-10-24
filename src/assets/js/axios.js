import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 5000 // 请求超时
// axios.defaults.headers.Authorization = localStorage.getItem('token')
axios.defaults.baseURL = 'https://www.cube007.cn/draco/'
// axios.defaults.baseURL = 'http://192.168.1.94:8088/'

// 请求拦截
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token')
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  console.log(error)
  return {
    code: '500',
    msg: '服务器连接异常'
  }
})

// 返回拦截
axios.interceptors.response.use((response) => {
  if (response.data.hasOwnProperty('token')) { // token验证
    localStorage.setItem('token', response.data.token)
    delete response.data.token
  }
  if (response.data.code === '401') {
    setTimeout(() => {
      localStorage.clear()
      location.reload()
    }, 1000)
    response.data.msg = '登录失效'
  }
  return response.data
  // ......
}, function (error) {
  console.log(error)
  return {
    code: '500',
    msg: '服务器连接异常'
  }
})

export default axios
