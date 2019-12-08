const MainFile = class {
  constructor() {}

  getTemplate() {
    let template = `
    import Vue from "vue";
    import App from "./App.vue";
    import router from "./router";
    import store from "./store";
    import alert from "./helpers/alert.vue";
    import money from "v-money";
    import VueTheMask from "vue-the-mask";
    import Multiselect from "vue-multiselect";
    import VueJsonPretty from "vue-json-pretty";
    import "./registerServiceWorker";

    import "bootstrap/dist/css/bootstrap.css";
    import "@fortawesome/fontawesome-free/css/all.css";
    import "vue-multiselect/dist/vue-multiselect.min.css";

    Vue.component("multiselect", Multiselect);
    Vue.component("vue-json-pretty", VueJsonPretty);

    Vue.use(VueTheMask);
    Vue.use(money, {
      decimal: ",",
      thousands: ".",
      prefix: "R$ ",
      precision: 2
    });

    Vue.prototype.$modal = {
      show(options) {
        return new Promise(resolve => {
          const alertComponent = Vue.extend(alert);
          const alertVue = new alertComponent();

          alertVue.$once("confirm", value => {
            alertVue.$destroy();
            alertVue.$el.remove();
            resolve(value);
          });

          alertVue.$props.options = options;
          alertVue.$mount();
          document.body.appendChild(alertVue.$el);
        });
      }
    };

    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");

    `;
    return template;
  }
};

module.exports = MainFile;
