import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase/compat/app"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/views/categories/Categories.vue'),
  },
  {
    path: '/movies',
    name: 'movies',
    component: () => import('@/views/movies/Movies.vue'),
  },
  {
    path: '/studios',
    name: 'studios',
    component: () => import('@/views/studios/Studios.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
      isPublic: true
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  let usuario = firebase.auth().currentUser
  let authorization = to.matched.some(record => !record.meta.isPublic)

  if (authorization && !usuario){
    next('login')
  } else if (!authorization && usuario) {
    next('dashboard')
  } else {
    next()
  }

  return false
})

export default router
