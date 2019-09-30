const MainFile = class {
  constructor() {}

  getTemplate() {
    let template = `
    import Vue from "vue";
    import axios from "axios";
    import App from "./App.vue";
    import {router, EndPoint } from "./router.js";
    import alert from "./helpers/alert.vue";
    import money from "v-money";
    import VueTheMask from "vue-the-mask";
    import Multiselect from "vue-multiselect";
    import "./registerServiceWorker";

    import "bootstrap/dist/css/bootstrap.css";
    import "vue-multiselect/dist/vue-multiselect.min.css";

    Vue.component("multiselect", Multiselect);

    Vue.use(VueTheMask);
    Vue.use(money, {
      decimal: ",",
      thousands: ".",
      prefix: "R$ ",
      precision: 2
    });

    Vue.prototype.$http = axios;
    Vue.prototype.$endPoint = new EndPoint(process.env.NODE_ENV === "production");

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

    Vue.config.productionTip = false;

    export const eventBus = new Vue({
      methods: {
        changeModalState() {
          this.$emit("modalHide");
        }
      }
    });

    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");

    `;
    return template;
  }
};

module.exports = MainFile;
