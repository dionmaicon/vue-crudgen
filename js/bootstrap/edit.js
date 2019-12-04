/* eslint-disable */
const capitalize = require('../libs/capitalize');

const Edit = class {
  constructor(name, model, resource) {
    this.modelName = name;
    this.model = model;
    this.resource = resource;
  }

  getTemplate() {
    let capitalizedName = capitalize(this.modelName);

    let templateHTMLBegin =
    `<template>
      <div class="${this.modelName}Edit">
        <div class="breadcrumbs">
          <nav style="display: inline">
            <li><router-link :to="{name: 'home', params:{} }"> Home </router-link></li> /
            <li><router-link :to="{name: '${this.modelName}', params:{} }"> ${this.modelName} </router-link></li>/
            <li><router-link class="breadcrumbs-active" :to="{name: '${this.modelName}Edit', params:{id: id} }"> edit ${this.modelName} </router-link></li>
          </nav>
        </div>
        <h1> Edit ${this.modelName} </h1>
        <${this.modelName}-form :id="id"></${this.modelName}-form>
      </div>
    </template>

    <script>
    import ${capitalizedName}Form from './${capitalizedName}Form.vue';

    export default {
      name: '${this.modelName}',
      data () {
        return {
          id: 'Teste'
        }
      },
      components: {
        ${capitalizedName}Form
      },
      created () {
          this.id = this.$route.params.id;
          this.$emit("showParent", false);
      }
    }
    </script>

    <style lang="css" scoped>
    h1 {
      text-transform: capitalize;
      text-align: center;
    }
    li {
      display: inline;
      text-transform: capitalize;
      font-size: 0.8em;
    }
    .breadcrumbs {
      background-color: white;
    }
    .breadcrumbs-active {
      text-decoration: underline;
      color: black;
      font-weight: bold;
    }
    </style>
    `;

    return templateHTMLBegin;
  }
};

module.exports = Edit;
