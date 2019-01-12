module.exports = {
  extends: [
    //'eslint:recommended',
    'plugin:vue/strongly-recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
  env:{
    'browser': true,
    'node': true
  }
}
