import Vue from "vue";
import VueRouter from "vue-router";

//[src/pages]の中にVueファイルを作っていく
import Home from "../pages/Home.vue";
import MyPage from "../pages/MyPage.vue";
import UserAuth from "../pages/UserAuth.vue";
import SignIn from "../pages/SignIn.vue";
import SelectUser from "../pages/SelectUser.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/mypage", name: "MyPage", component: MyPage },
  { path: "/auth", name: "UserAuth", component: UserAuth },
  { path: "/signin", name: "SignIn", component: SignIn },
  { path: "/selectuser", name: "SelectUser", component: SelectUser },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
