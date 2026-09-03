const Service = require("../js/service/service");
const Module = require("../js/store/module");

describe("Service template", () => {
  test("renders CRUD service helpers for the resource", () => {
    const service = new Service({
      name: "book",
      resource: { endPoint: "books" }
    });

    const template = service.getTemplate();

    expect(template).toMatch('import service from "@/services/httpService";');
    expect(template).toMatch('const END_POINT = "/books";');
    expect(template).toMatch("const getBook = id =>");
    expect(template).toMatch("const getAllBooks = params =>");
    expect(template).toMatch(/createBook/);
    expect(template).toMatch(/updateBook/);
    expect(template).toMatch(/deleteBook/);
  });
});

describe("Vuex store module template", () => {
  test("renders state, getters and actions for the model", () => {
    const vuexModule = new Module({ name: "book" });

    const template = vuexModule.getTemplate();

    expect(template).toMatch('} from "@/services/book";');
    expect(template).toMatch("books: []");
    expect(template).toMatch("getAllBooks(");
    expect(template).toMatch('"SET_BOOKS"');
    expect(template).toMatch('"CREATED_BOOK"');
  });
});
