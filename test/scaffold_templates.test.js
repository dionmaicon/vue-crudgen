const HttpService = require("../js/service/httpService");
const IndexStore = require("../js/store/indexStore");
const IndexModule = require("../js/store/indexModule");
const Eslintrc = require("../js/eslint/eslintrc");

describe("httpService template", () => {
  test("creates an axios instance with base url and json headers", () => {
    const template = new HttpService().getTemplate();

    expect(template).toMatch('import axios from "axios";');
    expect(template).toMatch(/baseURL: process\.env\.VUE_APP_BASE_URL/);
    expect(template).toMatch('"Content-Type": "application/json"');
    expect(template).toMatch("export default httpService;");
  });
});

describe("indexStore template", () => {
  test("registers vuex with persistence and modules", () => {
    const template = new IndexStore().getTemplate();

    expect(template).toMatch('import Vuex from "vuex";');
    expect(template).toMatch('import VuexPersistence from "vuex-persist";');
    expect(template).toMatch("Vue.use(Vuex);");
    expect(template).toMatch("export default new Vuex.Store({");
    expect(template).toMatch("plugins: [vuexLocal.plugin]");
  });
});

describe("indexModule template", () => {
  test("auto-loads store modules via require.context", () => {
    const template = new IndexModule().getTemplate();

    expect(template).toMatch('require.context(".", false, /.js$/)');
    expect(template).toMatch("export default");
  });
});

describe("eslintrc template", () => {
  test("configures prettier and vue plugins", () => {
    const template = new Eslintrc().getTemplate();

    expect(template).toMatch("module.exports = {");
    expect(template).toMatch("'plugin:prettier/recommended'");
    expect(template).toMatch("'plugin:vue/essential'");
  });
});
