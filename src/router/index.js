import { createRouter, createWebHistory } from 'vue-router'
import Chat from '../views/Chat.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Chat,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/sign-up',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
