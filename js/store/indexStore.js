const IndexStore = class {
  constructor() {}

  getTemplate() {
    let template = `
    import Vue from "vue";
    import Vuex from "vuex";
    import VuexPersistence from "vuex-persist";

    import modules from "./modules";

    const vuexLocal = new VuexPersistence({
      storage: window.localStorage
    });

    Vue.use(Vuex);

    export default new Vuex.Store({
      modules,
      plugins: [vuexLocal.plugin]
    });
    `;

    return template;
  }
};

module.exports = IndexStore;
