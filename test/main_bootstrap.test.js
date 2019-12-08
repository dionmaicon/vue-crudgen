const MainFile = require("../js/bootstrap/helpers/mainFile.js");
let mainFile = new MainFile();
let template = mainFile.getTemplate();

test("Check Dependencies Imports (Multiselect)", () => {
  expect(template).toMatch(/import Multiselect from "vue-multiselect";/);
  expect(template).toMatch(
    /import "vue-multiselect\/dist\/vue-multiselect\.min\.css";/
  );
});

test("Check Dependencies Imports (VueTheMask)", () => {
  expect(template).toMatch(/import VueTheMask from "vue-the-mask";/);
});

test("Check Dependencies Imports (VueJsonPretty)", () => {
  expect(template).toMatch(/import VueJsonPretty from "vue-json-pretty";/);
});

test("Check Dependencies Imports VMoney)", () => {
  expect(template).toMatch(/import money from "v-money";/);
});

test("Check Dependencies Imports (Boostrap)", () => {
  expect(template).toMatch(/import "bootstrap\/dist\/css\/bootstrap.css";/);
  expect(template).toMatch(
    /import "@fortawesome\/fontawesome-free\/css\/all.css";/
  );
});
