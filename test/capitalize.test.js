const capitalize = require("../js/libs/capitalize");

test("capitalizes the first letter of a lowercase word", () => {
  expect(capitalize("book")).toBe("Book");
});

test("leaves an already capitalized string unchanged", () => {
  expect(capitalize("Book")).toBe("Book");
});

test("only capitalizes the first character", () => {
  expect(capitalize("book title")).toBe("Book title");
});

test("handles empty strings", () => {
  expect(capitalize("")).toBe("");
});

test("handles single-character strings", () => {
  expect(capitalize("a")).toBe("A");
});

test("returns empty string for non-string input", () => {
  expect(capitalize(undefined)).toBe("");
  expect(capitalize(null)).toBe("");
  expect(capitalize(42)).toBe("");
  expect(capitalize({})).toBe("");
});
