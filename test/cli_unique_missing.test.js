const { spawnSync } = require("child_process");
const path = require("path");

test("missing unique model file reports a friendly error", () => {
  const result = spawnSync(
    process.execPath,
    [path.join(__dirname, "..", "main.js"), "-u", "missing-model.js"],
    {
      cwd: path.join(__dirname, ".."),
      encoding: "utf8",
      timeout: 60000
    }
  );

  expect(result.stderr).toMatch(/missing-model\.js" not found\./);
  expect(result.stderr).not.toMatch("Cannot find module");
});
