import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Profil from "../views/profil.vue"
import Items from '../views/Items.vue'
import createItem from "../views/createItem.vue"
import comment from "../views/comments.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:"/login",
    name: 'Login',
    component: Login
  },
  {
    path:"/signup",
    name: 'Signup',
    component: Signup
  },
  {
    path: "/items/profil",
    name: 'Profil',
    component: Profil
  },
  {
    path: "/item",
    name: 'Items',
    component: Items
  },
  {
    path: "/items/create",
    name: 'createItem',
    component: createItem
  },
  {
    path: "/comment",
    name: 'comment',
    component: comment
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
 
export default router
