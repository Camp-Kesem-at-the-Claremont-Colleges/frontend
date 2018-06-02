import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Article from '@/components/Article'
import EditArticle from '@/components/auth/EditArticle'
import Admin from '@/components/auth/Admin'
import Dashboard from '@/components/auth/Dashboard'
import ManageUsers from '@/components/auth/ManageUsers'
import Profile from '@/components/auth/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/article/:slug',
      name: 'Article',
      component: Article
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'new-post',
          component: EditArticle
        },
        {
          path: 'edit/:slug',
          component: EditArticle
        },
        {
          path: 'users',
          name: 'ManageUsers',
          component: ManageUsers
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile
        }
      ]
    }
  ],
  mode: 'history'
})
