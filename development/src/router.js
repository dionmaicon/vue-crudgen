import Vue from "vue";
import Router from "vue-router";
import Home from "./components/home.vue";

import addressView from "./components/address/addressView.vue";
import addressIndex from "./components/address/addressIndex.vue";
import addressEdit from "./components/address/addressEdit.vue";
import addressCreate from "./components/address/addressCreate.vue";

import userView from "./components/user/userView.vue";
import userIndex from "./components/user/userIndex.vue";
import userEdit from "./components/user/userEdit.vue";
import userCreate from "./components/user/userCreate.vue";

Vue.use(Router);

export default new Router({
  //mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/address",
      name: "address",
      component: addressIndex,
      children: [
        { path: "view/:id", component: addressView, name: "addressView" },
        { path: "edit/:id", component: addressEdit, name: "addressEdit" },
        { path: "create", component: addressCreate, name: "addressCreate" }
      ]
    },
    {
      path: "/user",
      name: "user",
      component: userIndex,
      children: [
        { path: "view/:id", component: userView, name: "userView" },
        { path: "edit/:id", component: userEdit, name: "userEdit" },
        { path: "create", component: userCreate, name: "userCreate" }
      ]
    },

    {
      path: "/",
      name: "home",
      component: Home
    }
  ]
});
