import Vue from 'vue'
import Router from 'vue-router'
import PageTest from '@/components/PageTest'
import PageIndex from '@/components/PageIndex'
import PageContent from '@/components/PageContent'
import PageMini from '@/components/PageMini'

Vue.use(Router)

window["requestAnimFrame"] = (function () {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           function (callback) {
              window.setTimeout(callback, 1000 / 60);
           };
})();

let mode = process.env.BUILD_MODE;
let routeInfo = {name:"PageIndex",component:PageIndex};
if(mode == 1){
  routeInfo = {name:"PageMini",component:PageMini};
}
else if(mode == 3){
  routeInfo = {name:"PageContent",component:PageContent};
}
else if(mode >= 100)
{
  let type = mode%10;
  if(type == 0 || type == 5) routeInfo = {name:"PageMini",component:PageMini};
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
