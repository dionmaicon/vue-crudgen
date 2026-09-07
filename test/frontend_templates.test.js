const { frontendTemplatesExist } = require("../main");

test("bootstrap templates are available", () => {
  expect(frontendTemplatesExist("bootstrap")).toBe(true);
});

test("vuetify templates are not shipped (yet)", () => {
  expect(frontendTemplatesExist("vuetify")).toBe(false);
});

test("unknown frontends report unavailable", () => {
  expect(frontendTemplatesExist("nope")).toBe(false);
});
