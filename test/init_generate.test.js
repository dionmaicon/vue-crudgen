const fs = require("fs");
const os = require("os");
const path = require("path");
const Init = require("../js/init");

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

describe("Init.generate", () => {
  let tmp;
  let config;
  let originalCwd;

  beforeAll(() => {
    originalCwd = process.cwd();
  });

  afterAll(() => {
    process.chdir(originalCwd);
  });

  beforeEach(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), "vue-crudgen-"));
    ["routes", "router", "services", "store/modules", "helpers", "src"].forEach(
      rel => {
        fs.mkdirSync(path.join(tmp, rel), { recursive: true });
      }
    );
    process.chdir(tmp);

    config = {
      frontend: "bootstrap",
      pathRoutes: path.join(tmp, "routes"),
      pathRouter: path.join(tmp, "router"),
      pathServices: path.join(tmp, "services"),
      pathStore: path.join(tmp, "store"),
      pathStoreModules: path.join(tmp, "store/modules"),
      pathHelpers: path.join(tmp, "helpers")
    };
  });

  afterEach(() => {
    process.chdir(originalCwd);
  });

  test("writes every scaffold bootstrap file", async () => {
    const init = new Init(config);

    init.generate();

    const expected = [
      "routes/index.js",
      "router/index.js",
      "services/httpService.js",
      "store/index.js",
      "store/modules/index.js",
      "helpers/alert.vue",
      "src/main.js",
      ".eslintrc.js"
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

  test("main.js template imports the bootstrap dependencies", async () => {
    const init = new Init(config);

    init.generate();

    await waitFor(() => {
      const mainPath = path.join(tmp, "src/main.js");
      return fs.existsSync(mainPath) && fs.statSync(mainPath).size > 0;
    });

    const main = fs.readFileSync(path.join(tmp, "src/main.js"), "utf8");

    expect(main).toMatch(/import Multiselect from "vue-multiselect";/);
  });
});
