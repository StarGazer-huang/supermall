import Vue from 'vue'
import VueRouter from 'vue-router';

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Profile = () => import('../views/profile/Profile')
const Shopcart = () => import('../views/shopcart/Shopcart')
const Detail = () => import('../views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router