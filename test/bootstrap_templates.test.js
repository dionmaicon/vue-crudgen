const model = {
  title: { type: "text" },
  price: { type: "currency" },
  active: {
    type: "radio",
    options: [
      { id: "Active", value: true },
      { id: "Inactive", value: false }
    ]
  },
  birth: { type: "hiddenFields", options: ["birth"] }
};
const resource = { endPoint: "books" };

const template = name => {
  const Template = require(`../js/bootstrap/${name}`);
  return new Template("book", model, resource).getTemplate();
};

describe("bootstrap view template", () => {
  test("renders the view card with model fields", () => {
    const view = template("view");

    expect(view).toMatch("View book");
    expect(view).toMatch(/title/);
  });
});

describe("bootstrap form template", () => {
  test("renders inputs for visible fields only", () => {
    const form = template("form");

    expect(form).toMatch('id="bookForm"');
    expect(form).toMatch("handleSubmit");
    expect(form).toMatch(/title/);
    expect(form).toMatch(/price/);
    expect(form).not.toMatch(/birth/);
  });
});

describe("bootstrap index template", () => {
  test("renders the index layout for the model", () => {
    const index = template("index");

    expect(index).toMatch(/Book/);
    expect(index).toMatch(/book/);
  });
});

describe("bootstrap create and edit templates", () => {
  test("create wires the form component", () => {
    const create = template("create");

    expect(create).toMatch("bookCreate");
    expect(create).toMatch(/BookForm/);
  });

  test("edit wires the form component", () => {
    const edit = template("edit");

    expect(edit).toMatch("bookEdit");
    expect(edit).toMatch(/BookForm/);
  });
});
