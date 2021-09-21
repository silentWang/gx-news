// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

if(process.env.BUILD_MODE == 2 || process.env.BUILD_MODE == 4){
  window&&window.location&&window.location.href.search("v=101")>=0?window.check_version = true:window.check_version = false;
  window&&window.history&&window.history.pushState("","","/mini/001");
}
else if(process.env.BUILD_MODE == 5){
  window&&window.location&&window.location.href.search("v=101")>=0?window.check_version = true:window.check_version = false;
  window&&window.history&&window.history.pushState("","","/mini/002");
}
let script = document.createElement("script");
script.src = "//static.mediav.com/js/feed_ts.js";
script.onload = ()=>{
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
}
document.body.appendChild(script);
