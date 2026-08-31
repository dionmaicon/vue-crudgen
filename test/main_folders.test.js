const fs = require("fs");
const os = require("os");
const path = require("path");
const { config, createBaseFolders, createFolder } = require("../main");

const BASE_PATH_KEYS = [
  "pathRoutes",
  "pathRouter",
  "pathComponents",
  "pathModels",
  "pathServices",
  "pathStore",
  "pathViews",
  "pathStoreModules",
  "pathHelpers"
];

describe("createBaseFolders", () => {
  let tmp;
  let originals;

  beforeEach(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), "vue-crudgen-"));
    originals = {};
    BASE_PATH_KEYS.forEach(key => {
      originals[key] = config[key];
      config[key] = path.join(tmp, key);
    });
  });

  afterEach(() => {
    BASE_PATH_KEYS.forEach(key => {
      config[key] = originals[key];
    });
  });

  test("creates every configured scaffold folder", () => {
    createBaseFolders();

    BASE_PATH_KEYS.forEach(key => {
      expect(fs.existsSync(config[key])).toBe(true);
    });
  });

  test("is idempotent when folders already exist", () => {
    createBaseFolders();

    expect(() => createBaseFolders()).not.toThrow();
  });
});

describe("createFolder", () => {
  test("creates a named folder under the base path and is idempotent", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "vue-crudgen-"));

    createFolder("book", tmp);

    expect(fs.existsSync(path.join(tmp, "book"))).toBe(true);
    expect(() => createFolder("book", tmp)).not.toThrow();
  });
});
