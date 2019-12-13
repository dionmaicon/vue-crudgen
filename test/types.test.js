const Types = require("../js/types");

const model = {
  title: {
    type: Types.TEXT,
    required: true
  },
  ISBN: {
    type: Types.NUMBER,
    required: true
  },
  authors: {
    type: Types.ONE_TO_MANY,
    attribute: "name",
    model: "author"
  },
  publishing: {
    type: Types.ONE_TO_ONE,
    attribute: "name",
    model: "publishing"
  },
  price: {
    type: Types.CURRENCY
  },
  birth: {
    type: "date",
    required: true
  },
  active: {
    type: Types.RADIO,
    options: [
      { id: "Active", value: true },
      { id: "Inactive", value: false }
    ]
  },
  sponsor: {
    type: Types.SELECT,
    options: ["Patron", "Vue-Crudgen"]
  }
};

test("Check if types are valid", () => {
  let count = 0;

  for (let prop in model) {
    if (model.hasOwnProperty(prop)) {
      if (Types.isValid(model[prop].type)) {
        count++;
      }
    }
  }
  expect(count).toBe(8);
});

test("Check if Types Models is invalid", () => {
  let person = {
    sponsor: {
      type: "selects",
      options: ["Patron", "Vue-Crudgen"]
    }
  };

  let count;

  for (let prop in person) {
    if (person.hasOwnProperty(prop)) {
      if (Types.isValid(person[prop].type)) {
        count++;
      }
    }
  }
  expect(count).not.toBe(1);
});

test("Check if model is valid", () => {
  let response = Types.modelIsValid(model);
  expect(response).toEqual({
    message: "Model is valid.",
    success: true
  });
});

test("Check if model is invalid (CURRENCY)", () => {
  model.supply = {
    type: Types.CURRENCY
  };

  let response = Types.modelIsValid(model);

  expect(response.message).toMatch("Model is valid.");
  expect(response.success).toBeTruthy();
});

test("Check if model is invalid (TEXTAREA)", () => {
  model.supply = {
    type: Types.TEXTAREA
  };

  let response = Types.modelIsValid(model);

  expect(response.message).toMatch("Model is valid.");
  expect(response.success).toBeTruthy();
});

test("Check if model is invalid (HTML)", () => {
  model.supply = {
    type: Types.HTML
  };

  let response = Types.modelIsValid(model);

  expect(response.message).toMatch("Model is valid.");
  expect(response.success).toBeTruthy();
});

test("Check if model is invalid (FILE)", () => {
  model.supply = {
    type: Types.FILE
  };

  let response = Types.modelIsValid(model);

  expect(response.message).toMatch("Model is valid.");
  expect(response.success).toBeTruthy();
});

test("Check if model is invalid ()", () => {
  model.supply = {
    type: Types.CURRENCY
  };

  let response = Types.modelIsValid(model);

  expect(response.message).toMatch("Model is valid.");
  expect(response.success).toBeTruthy();
});

test("Check if model is invalid (ONE_TO_ONE)", () => {
  model.supply = {
    type: Types.ONE_TO_ONE
  };

  let response = Types.modelIsValid(model);

  expect(response.message).toMatch("Model type: supply needs model property.");

  expect(response.message).toMatch(
    "Model type: supply needs attribute property"
  );

  expect(response.success).toBeFalsy();
});

test("Check if model is invalid (ONE_TO_MANY)", () => {
  model.supply = {
    type: Types.ONE_TO_MANY
  };

  let response = Types.modelIsValid(model);

  expect(response.message).toMatch("Model type: supply needs model property.");

  expect(response.message).toMatch(
    "Model type: supply needs attribute property"
  );

  expect(response.success).toBeFalsy();
});

test("Check if model is invalid (RADIO)", () => {
  model.supply = {
    type: Types.RADIO
  };

  let response = Types.modelIsValid(model);

  expect(response.message).toMatch(
    "Model type: supply needs options property."
  );

  expect(response.success).toBeFalsy();
});

test("Check if model is invalid (CHECKBOX)", () => {
  model.supply = {
    type: Types.CHECKBOX
  };

  let response = Types.modelIsValid(model);

  expect(response.message).toMatch(
    "Model type: supply needs options property."
  );

  expect(response.success).toBeFalsy();
});

test("Check if model is invalid (SELECT)", () => {
  model.supply = {
    type: Types.SELECT
  };

  let response = Types.modelIsValid(model);

  expect(response.message).toMatch(
    "Model type: supply needs options property."
  );

  expect(response.success).toBeFalsy();
});

test("Check if model is invalid (INVALID TYPE)", () => {
  model.supply = {
    type: "default"
  };

  let response = Types.modelIsValid(model);

  expect(response.message).toMatch("Model type: supply is invalid.");

  expect(response.success).toBeFalsy();
});

test("Check if model is invalid (Model Inherited)", () => {
  const obj = Object.create({ name: "stuart" });

  let response = Types.modelIsValid(obj);

  expect(response.message).toMatch("Model invalid.");

  expect(response.success).toBeFalsy();
});
