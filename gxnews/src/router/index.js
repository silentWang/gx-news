import Vue from 'vue'
import Router from 'vue-router'
import PageTest from '@/components/PageTest'
import PageIndex from '@/components/PageIndex'
import PageContent from '@/components/PageContent'
// import PageMini from '@/components/PageMini'
import PageMiniA from '@/components/PageMiniA'

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
if(process.env.BUILD_MODE == 2){
  routeInfo.name = "PageMiniA";
  routeInfo.component = PageMiniA;
}
else if(process.env.BUILD_MODE == 3){
  routeInfo.name = "PageContent";
  routeInfo.component = PageContent;
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
