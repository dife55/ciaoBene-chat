import { createRouter, createWebHistory } from 'vue-router'
import Chat from '../views/Chat.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Success from '../views/Success.vue'
import Deleted from '../views/Deleted.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Chat,
  },
  {
    path: '/sign-up',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/success',
    name: 'Success',
    component: Success
  },
  {
    path: '/deleted',
    name: 'Deleted',
    component: Deleted
  },
  {
    path: '/login',
    name: 'Login',
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
