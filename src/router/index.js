import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../components/homeCrud.vue'
import patientsCrud from '../components/patientsCrud.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homeCrud',
    component: HomeView,
  },
  {
    path: '/patientsCrud',
    name: 'patientsCrud',
    component: patientsCrud,
  },
  // {
  //   path: '/Login',
  //   name: 'Login',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: Login,
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
