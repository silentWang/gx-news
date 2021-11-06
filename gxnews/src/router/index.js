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
let mode = process.env.BUILD_MODE;
if(mode == 2 || mode == 4) routeInfo = {name:"PageMiniA",component:PageMiniA};
else if(mode == 3 || mode == 7) routeInfo = {name:"PageContent",component:PageContent};
else if(mode == 5 || mode == 6) routeInfo = {name:"PageMiniB",component:PageMiniB};
else if(mode >= 100)
{
  let type = mode%10;
  if(type == 0 || type == 5) routeInfo = {name:"PageMiniB",component:PageMiniB};
  if(type == 1 || type == 6) routeInfo = {name:"PageIndex",component:PageIndex};
  else if(type == 2 || type == 7) routeInfo = {name:"PageContent",component:PageContent};
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
