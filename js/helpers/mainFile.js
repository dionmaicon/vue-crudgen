const MainFile = class {
  constructor() {}

  getTemplate() {
    let template = `
    import Vue from "vue";
    import axios from "axios";
    import App from "./App.vue";
    import {router, EndPoint } from "./router.js";
    import alert from "./helpers/alert.vue";
    import "bootstrap/dist/css/bootstrap.css";

    Vue.prototype.$http = axios;
    Vue.prototype.$endPoint = new EndPoint(false);

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
