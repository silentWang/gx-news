import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = '/face'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 60000
// 允许携带cookie( 人脸采集需要设置为false)
axios.defaults.withCredentials = true

// 服务器响应拦截器，这里拦截403错误
axios.interceptors.response.use(
  response => {
    if (response.data.code === 403 && response.data.message === 'Forbidden') {
      Vue.prototype.$message({
        type: 'warning',
        duration: 1500,
        showClose: true,
        message: '您还没有访问权限！'
      })
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 504:
          Vue.prototype.$message({
            type: 'warning',
            message: '服务器繁忙！'
          })
          break
        case 403:
          Vue.prototype.$message({
            type: 'warning',
            message: '您还没有访问该功能的权限！'
          })
          break
        case 401:
          Vue.prototype.$message({
            type: 'warning',
            message: '登录过期，请重新登录！'
          })
          // router.push({
          //   path: '/login',
          //   query: {
          //     redirect
          //   }
          // })
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  }
)

export default axios
