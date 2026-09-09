const { spawnSync } = require("child_process");
const path = require("path");
const { version } = require("../package.json");

test("--version banner matches package.json", () => {
  const result = spawnSync(
    process.execPath,
    [path.join(__dirname, "..", "main.js"), "--version"],
    { encoding: "utf8", timeout: 30000 }
  );

  expect(result.status).toBe(0);
  expect(result.stdout).toMatch(
    `Vue.js CRUD-GEN Version: ${version} developed by Dion Maicon - BETA`
  );
});
