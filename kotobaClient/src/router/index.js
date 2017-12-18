import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HomePage from '@/components/HomePage'
import Explore from '@/components/Explore'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Space from '@/components/Space'
 
Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: HomePage
    },{
      path:'/explore',
      name:'explore',
      component:Explore
    },{
      path:'/login',
      name:'login',
      component:Login
    },{
      path:'/register',
      name:'register',
      component:Register
    },{
      path:'/space/:nickname',
      name:'space',
      component:Space
    },{
      path: '/test',
      name: 'Hello',
      component: HelloWorld
    }]
})

export default router
