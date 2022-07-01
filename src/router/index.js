import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:{
      name:"Home"
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "about" */ '../views/Detail.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: "about" */ '../views/Menu.vue')
      },
      {
        path: '/car',
        name: 'Car',
        component: () => import(/* webpackChunkName: "about" */ '../views/Car.vue')
      },
      {
        path: '/my',
        name: 'My',
        component: () => import(/* webpackChunkName: "about" */ '../views/My.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
