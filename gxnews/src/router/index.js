import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PageIndex from '@/components/PageIndex'
import PageTemp from '@/components/PageTemp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PageIndex',
      component: PageIndex
    },
    {
      path:'/content',
      name:'PageTemp',
      component:PageTemp
    }
  ]
})
