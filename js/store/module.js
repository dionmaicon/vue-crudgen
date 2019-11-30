const pluralize = require("pluralize");
const capitalize = require("../libs/capitalize");

const Module = class {
  constructor(config) {
    this.config = config;
  }

  getTemplate() {
    let capitalizedName = capitalize(this.config.name);
    let upperCaseName = capitalizedName.toUpperCase();
    let pluralizedName = pluralize(this.config.name);
    let pluralizedAndCapitalizedName = pluralize(capitalizedName);
    let pluralizedAndUpperCaseName = pluralize(upperCaseName);

    let template = `
    import {
      getAll${pluralizedAndCapitalizedName},
      create${capitalizedName},
      update${capitalizedName},
      delete${capitalizedName}
    } from "@/services/${this.config.name}";

    const state = {
      ${pluralizedName}: [],
      processed: false
    };

    const getters = {
      get${pluralizedAndCapitalizedName}(state) {
        return state.${pluralizedName};
      },
      ${this.config.name}Processed(state){
        return state.processed;
      }
    };

    const actions = {
      fetch${pluralizedAndCapitalizedName}({ commit }, params) {
          return new Promise((resolve, reject) => {
            getAll${pluralizedAndCapitalizedName}(
              params
            )
              .then(response => {
                commit("SET_${pluralizedAndUpperCaseName}", response.data);
                resolve(response);
              })
              .catch(error => {
                reject(error);
              });
          });
        },
        create${capitalizedName}({ commit }, ${this.config.name}) {
          return new Promise((resolve, reject) => {
            create${capitalizedName}(${this.config.name})
              .then(response => {
                commit("CREATED_${upperCaseName}");
                resolve(response.data);
              })
              .catch(error => {
                reject(error);
              });
          });
        },
        update${capitalizedName}({ commit }, ${this.config.name}) {
          return new Promise((resolve, reject) => {
            update${capitalizedName}(${this.config.name})
              .then(response => {
                commit("UPDATED_${upperCaseName}");
                resolve(response.data);
              })
              .catch(error => {
                reject(error);
              });
          });
        },
        delete${capitalizedName}({ commit }, id) {
          return new Promise((resolve, reject) => {
            delete${capitalizedName}(id)
              .then(response => {
                commit("DELETED_${upperCaseName}");
                resolve(response.data);
              })
              .catch(error => {
                reject(error);
              });
          });
        }
      };

    const mutations = {
      SET_${pluralizedAndUpperCaseName}(state, data) {
        state.${pluralizedName} = data;
        state.processed = false;
      },
      CREATED_${upperCaseName}(state) {
        state.processed = true;
      },
      UPDATED_${upperCaseName}(state) {
        state.processed = true;
      },
      DELETED_${upperCaseName}(state) {
        state.processed = true;
      }
    };

    export default {
      state,
      getters,
      actions,
      mutations
    };
    `;

    return template;
  }
};

module.exports = Module;
