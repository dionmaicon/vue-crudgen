const fs = require("fs");
const os = require("os");
const path = require("path");
const Crud = require("../js/crud");

const waitFor = conditionFn =>
  new Promise((resolve, reject) => {
    const startedAt = Date.now();
    const check = () => {
      if (conditionFn()) {
        return resolve();
      }
      if (Date.now() - startedAt > 2000) {
        return reject(new Error("timed out waiting for generated files"));
      }
      setTimeout(check, 25);
    };
    check();
  });

describe("Crud.generate", () => {
  let tmp;
  let config;

  beforeEach(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), "vue-crudgen-"));
    ["components/book", "routes", "services", "store/modules"].forEach(rel => {
      fs.mkdirSync(path.join(tmp, rel), { recursive: true });
    });

    config = {
      name: "book",
      model: {
        title: { type: "text" },
        price: { type: "currency" }
      },
      resource: "books",
      frontend: "bootstrap",
      pathComponents: path.join(tmp, "components"),
      pathRoutes: path.join(tmp, "routes"),
      pathServices: path.join(tmp, "services"),
      pathStoreModules: path.join(tmp, "store/modules")
    };
  });

  test("writes every scaffold file for a model", async () => {
    const crud = new Crud(config);

    crud.generate();

    const expected = [
      "components/book/BookView.vue",
      "components/book/BookForm.vue",
      "components/book/BookIndex.vue",
      "components/book/BookEdit.vue",
      "components/book/BookCreate.vue",
      "routes/book.js",
      "services/book.js",
      "store/modules/book.js"
    ];

    await waitFor(() =>
      expected.every(
        rel =>
          fs.existsSync(path.join(tmp, rel)) &&
          fs.statSync(path.join(tmp, rel)).size > 0
      )
    );

    expected.forEach(rel => {
      expect(fs.statSync(path.join(tmp, rel)).size).toBeGreaterThan(0);
    });
  });

  test("view template uses the capitalized model name", async () => {
    const crud = new Crud(config);

    crud.generate();

    await waitFor(() => {
      const viewPath = path.join(tmp, "components/book/BookView.vue");
      return fs.existsSync(viewPath) && fs.statSync(viewPath).size > 0;
    });

    const view = fs.readFileSync(
      path.join(tmp, "components/book/BookView.vue"),
      "utf8"
    );

    expect(view).toMatch(/Book/);
  });
});
