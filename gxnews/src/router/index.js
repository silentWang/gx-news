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

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PageIndex',
      component: PageIndex
    },
    // {
    //   path:"/test",
    //   name:"PageTest",
    //   component:PageTest
    // },
    {
      path:'/content',
      name:'PageContent',
      component:PageContent
    },
    {
      path:'/mini',
      name:'PageMiniA',
      component:PageMiniA
    }
  ]
})
