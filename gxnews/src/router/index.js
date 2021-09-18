import Vue from 'vue'
import Router from 'vue-router'
import PageTest from '@/components/PageTest'
import PageIndex from '@/components/PageIndex'
import PageContent from '@/components/PageContent'
// import PageMini from '@/components/PageMini'
import PageMiniA from '@/components/PageMiniA'
import PageMiniB from '@/components/PageMiniB'

Vue.use(Router)

window["requestAnimFrame"] = (function () {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           function (callback) {
              window.setTimeout(callback, 1000 / 60);
           };
})();

let routeInfo = {name:"PageIndex",component:PageIndex};
if(process.env.BUILD_MODE == 2 || process.env.BUILD_MODE == 4){
  routeInfo.name = "PageMiniA";
  routeInfo.component = PageMiniA;
}
else if(process.env.BUILD_MODE == 3){
  routeInfo.name = "PageContent";
  routeInfo.component = PageContent;
}
else if(process.env.BUILD_MODE == 5){
  routeInfo.name = "PageMiniB";
  routeInfo.component = PageMiniB;
}

if(process.env.NODE_ENV == "development"){
  let meta = document.createElement("meta");
  meta.setAttribute("name","referrer");
  meta.setAttribute("content","no-referrer");
  document.head.appendChild(meta);
}

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: routeInfo.name,
      component: routeInfo.component
    }
  ]
})
