const resource = {
  endPoint: "https://vuejs-resource-tutorial.firebaseio.com/data.json"
}

const model = (function() {
  return {
    'id': {
      type:   "number",
      required: false,
      primaryKey: true,
      autoIncrement: true
    },
    'username': {
      type:  "text",
      required: true
    },
    'touchedAt': {
      type:  "date",
      required: true
    },
    'aNumber': {
      type:   "number",
      required: true
    },
    'bNumber': {
      type:   "number",
      required: true
    },
    'validate': {
      type: 'number',
      required: true
    },
    'validateCustom': {
      type:  "text",
      required: false
    },
    'defaultValueBoolean': {
      type:  'boolean',
      required: true,
      defaultValue: '1'
    },
    'createdAt': {
      type:  "date",
      required: false
    },
    'updateAt': {
      type:  "date",
      required: false
    }
  }
})();

module.exports = {model, resource}
