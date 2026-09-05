const Router = require("../js/router/router");
const IndexRouter = require("../js/router/indexRouter");

describe("Router template", () => {
  test("renders the route object for the model", () => {
    const template = new Router("book").getTemplate();

    expect(template).toMatch(
      'import BookView from "@/components/book/BookView.vue";'
    );
    expect(template).toMatch(
      'import BookCreate from "@/components/book/BookCreate.vue";'
    );
    expect(template).toMatch("const book = {");
    expect(template).toMatch('path: "/book"');
    expect(template).toMatch('name: "book"');
    expect(template).toMatch('path: "view/:id"');
    expect(template).toMatch('path: "edit/:id"');
    expect(template).toMatch('path: "create"');
    expect(template).toMatch("export default book;");
  });
});

describe("IndexRouter templates", () => {
  test("routes index auto-loads route files but skips itself", () => {
    const template = new IndexRouter().getIndexRouterTemplate();

    expect(template).toMatch('require.context(".", false, /\\.js$/)');
    expect(template).toMatch('if (fileName === "./index.js") return;');
    expect(template).toMatch("export default routes;");
  });

  test("router index registers vue-router and home route", () => {
    const template = new IndexRouter().getRouterTemplate();

    expect(template).toMatch('import VueRouter from "vue-router";');
    expect(template).toMatch("Vue.use(VueRouter);");
    expect(template).toMatch('name: "home"');
  });
});
