// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import DataCenter from './api/DataCenter'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

let isLoadBool = true;
let mode = process.env.BUILD_MODE;
let scripts = ["//static.mediav.com/js/feed_ts.js","../static/js/v9.js"];
if(mode == 2 || mode == 4){
  window.check_version = window.location && window.location.href.search("v=101") >= 0;
  window&&window.history&&window.history.pushState("","","/mini/001");
}
else if(mode == 5){
  window.check_version = window.location&&window.location.href.search("v=101") >= 0;
  window&&window.history&&window.history.pushState("","","/mini/002");
}
else if(mode == 6){
  window.check_version = window.location&&window.location.href.search("v=101") >= 0;
  window&&window.history&&window.history.pushState("","","/mini/000");
}
else if(mode == 3 || mode == 7){
  scripts.push("//static.mediav.com/js/mvf_g4.js");
  isLoadBool = false;
  DataCenter.getAreaData().then(()=>{
    isLoadBool = true;
    DataCenter.getDetailInfo().then((res)=>{
      if(res.code == -1) return;
      loadNext();
    });
  });
}
let index = 0;
function loadNext(){
  let script = document.createElement("script");
  script.src = scripts[index];
  script.onload = ()=>{
    index++;
    if(index >= scripts.length){
      setUpNow();
      console.log("init complete")
    }
    else{
      loadNext();
    }
  }
  document.body.appendChild(script);
}
if(isLoadBool){
  loadNext();
}

function setUpNow(){
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
}
