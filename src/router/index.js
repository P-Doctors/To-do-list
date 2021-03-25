import Vue from 'vue'
import VueRouter from 'vue-router'

//[src/pages]の中にVueファイルを作っていく
import Home from '../pages/Home.vue'
import Hoge from '../pages/Hoge.vue'
import UserAuth from '../pages/UserAuth.vue'
import SignIn from '../pages/SignIn.vue'


Vue.use(VueRouter)

const routes = [
  {path: '/home', name: 'Home', component: Home },
  {path: '/hoge', name: 'Hoge', component: Hoge },
  {path: '/auth', name: 'UserAuth', component: UserAuth },
  {path: '/signin', name: 'SignIn', component: SignIn },

]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
})

export default router
