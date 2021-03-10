import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Profil from "../views/profil.vue"
import otherProfil from "../views/otherProfil.vue"
import Items from '../views/Items.vue'
import createItem from "../views/createItem.vue"
import comment from "../views/comments.vue"
import report from "../views/report.vue"

let user = localStorage.getItem("searchProfil")

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
    path: `/item/profil/${user}`,
    name: "otherProfil",
    component: otherProfil
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
  },
  {
    path: "/report",
    name: 'report',
    component: report
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
 
export default router
