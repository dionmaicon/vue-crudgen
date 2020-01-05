const IndexRouter = class {
  constructor() {}

  getIndexRouterTemplate() {
    let template = `
    const requireroute = require.context(".", false, /\\.js$/);
    const routes = [];

    requireroute.keys().forEach(fileName => {
      if (fileName === "./index.js") return;

      routes.push(requireroute(fileName).default);
    });

    export default routes;
    `;
    return template;
  }

  getRouterTemplate() {
    let template = `
    import Vue from "vue";
    import VueRouter from "vue-router";
    import Home from "../views/Home.vue";
    import routes from "../routes";

    Vue.use(VueRouter);

    routes.push({
      path: "/",
      name: "home",
      component: Home
    });

    routes.push({
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
    });

    const router = new VueRouter({
      mode: "history",
      base: process.env.BASE_URL,
      routes
    });

    export default router;

    `;
    return template;
  }
};

module.exports = IndexRouter;
