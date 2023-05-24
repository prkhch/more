import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from "@/views/HomeView.vue"
import DetailView from "@/views/DetailView.vue"
import SignupView from "@/views/SignupView.vue"
import LoginView from "@/views/LoginView.vue"
import SearchView from "@/views/SearchView.vue"
import ProfileView from "@/views/ProfileView.vue"
import LaterView from "@/views/LaterView.vue"
import TestView from "@/views/TestView.vue"
import EditProfileView from "@/views/EditProfileView.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movies/:id',
    name : 'detail',
    component : DetailView
  },
  {
    path: '/signup',
    name : 'signup',
    component : SignupView
  },
  {
    path: '/login',
    name : 'login',
    component : LoginView
  },
  {
    path: '/search',
    name : 'search',
    component : SearchView
  },
  {
    path: '/profile/:username',
    name : 'profile',
    component : ProfileView
  },
  {
    path: '/profile/:username/edit',
    name : 'editprofile',
    component : EditProfileView
  },
  {
    path: '/later/:username',
    name : 'later',
    component : LaterView
  },
  {
    path: '/test',
    name : 'test',
    component : TestView
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
