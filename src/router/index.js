import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import talk from '@/components/talk'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Login',
      component: Login
    },
    {
      path:'/2',
      name:'talk',
      component: talk
    }
  ]
})


