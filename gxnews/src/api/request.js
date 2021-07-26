import Vue from 'vue'
import axios from 'axios'
import NetHttp from './NetHttp'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers['X-APP-KEY'] = 'A000001'
axios.defaults.timeout = 60000
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.withCredentials = false
axios.defaults.headers["userId"] = (()=>{
  let userid = localStorage.getItem("rdxw_15de_userId");
  if(userid && parseInt(userid) > 0){
      let last = parseInt(userid);
      let now = new Date().getTime();
      if(now - last <= 604800) return last;
  }
  let ranid = new Date().getTime();
  localStorage.setItem("rdxw_15de_userId",ranid);
  return ranid;
})();

NetHttp.DFTT_ADVER_URL = process.env.DFTT_ADVER_URL

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
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  }
)

export default axios
