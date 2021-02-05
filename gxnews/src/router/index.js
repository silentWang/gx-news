import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PageIndex from '@/components/PageIndex'
import PageContent from '@/components/PageContent'

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
      name:'PageContent',
      component:PageContent
    }
  ]
})
