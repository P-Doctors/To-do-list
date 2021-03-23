import Vue from 'vue'
import VueRouter from 'vue-router'

//[src/pages]の中にVueファイルを作っていく
import Home from '../pages/Home.vue'
import Hoge from '../pages/Hoge.vue'
import MyPage from '../pages/MyPage.vue'
import SelectUser from '../pages/SelectUser.vue'
import Calendar from '../pages/Calendar.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/home', name: 'Home', component: Home },
  {path: '/hoge', name: 'Hoge', component: Hoge },
  {path: '/mypage', name: 'MyPage', component: MyPage },
  {path: '/selectuser', name: 'SelectUser', component: SelectUser },
  {path: '/calendar', name: 'Calendar', component: Calendar },

]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
})

export default router
