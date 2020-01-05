const ONE_TO_ONE = "oneToOne";
const ONE_TO_MANY = "oneToMany";
const TEXT = "text";
const SELECT = "select";
const TEXTAREA = "textarea";
const NUMBER = "number";
const CURRENCY = "currency";
const HTML = "html";
const RADIO = "radio";
const CHECKBOX = "checkbox";
const FILE = "file";
const HIDDEN_FIELDS = "hiddenFields";

const HTML5_TYPES = [
  "color",
  "date",
  "datetime-local",
  "email",
  "hidden",
  "image",
  "month",
  "password",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "time",
  "url",
  "week"
];

const Types = class {
  constructor() {}

  isValid() {}

  static get ONE_TO_ONE() {
    return ONE_TO_ONE;
  }

  static get ONE_TO_MANY() {
    return ONE_TO_MANY;
  }

  static get TEXT() {
    return TEXT;
  }

  static get SELECT() {
    return SELECT;
  }

  static get TEXTAREA() {
    return TEXTAREA;
  }

  static get NUMBER() {
    return NUMBER;
  }

  static get CURRENCY() {
    return CURRENCY;
  }

  static get HTML() {
    return HTML;
  }

  static get RADIO() {
    return RADIO;
  }

  static get CHECKBOX() {
    return CHECKBOX;
  }

  static get FILE() {
    return FILE;
  }

  static get HIDDEN_FIELDS() {
    return HIDDEN_FIELDS;
  }

  static get validTypes() {
    return HTML5_TYPES.concat([
      ONE_TO_ONE,
      ONE_TO_MANY,
      TEXT,
      SELECT,
      TEXTAREA,
      NUMBER,
      CURRENCY,
      HTML,
      RADIO,
      CHECKBOX,
      FILE,
      HIDDEN_FIELDS
    ]);
  }

  static isValid(value) {
    let types = this.validTypes;
    return types.find(type => type == value);
  }

  static modelIsValid(model) {
    let response = {
      message: "",
      success: true
    };

    for (let prop in model) {
      if (!model.hasOwnProperty(prop)) {
        response.message = "Model invalid.";
        response.success = false;
        continue;
      }

      let object = model[prop];
      switch (model[prop].type) {
        case Types.ONE_TO_ONE:
        case Types.ONE_TO_MANY:
          if (!object.attribute) {
            response.message += `Model type: ${prop} needs attribute property.\n`;
            response.success = false;
          }
          if (!object.model) {
            response.message += `Model type: ${prop} needs model property.\n`;
            response.success = false;
          }
          break;
        case Types.RADIO:
        case Types.CHECKBOX:
        case Types.SELECT:
        case Types.HIDDEN_FIELDS:
          if (!object.options) {
            response.message += `Model type: ${prop} needs options property.\n`;
            response.success = false;
          }
          break;
      }
      if (!this.isValid(model[prop].type)) {
        response.message += `Model type: ${prop} is invalid.\n`;
        response.success = false;
      }
    }

    if (!response.success) {
      return response;
    } else {
      response.message = "Model is valid.";
      return response;
    }
  }
};

module.exports = Types;
