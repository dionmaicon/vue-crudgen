/* eslint-disable */
const capitalize = require("../libs/capitalize");
const Types = require("../types");

const View = class {
  constructor(name, model, resource) {
    this.modelName = name;
    this.model = model;
    this.resource = resource;
  }

  getTemplate() {
    let capitalizedName = capitalize(this.modelName);

    let template = `<template>
        <div class="view">
          <div class="breadcrumbs">
            <nav style="display: inline">
              <li class="liTitle" ><router-link :to="{name: 'home', params:{} }"> Home </router-link></li> /
              <li class="liTitle" ><router-link :to="{name: '${this.modelName}', params:{} }"> ${this.modelName} </router-link></li>/
              <li class="liTitle" ><router-link class="breadcrumbs-active" :to="{name: '${this.modelName}View', params:{id: id} }"> view ${this.modelName} </router-link></li>
            </nav>
          </div>

          <div class="row">
              <div class="card" style="width: 100%;">
                <div class="card-header">
                  View ${this.modelName}
                </div>
                  <ul class="list-group list-group-flush">
                  viewStruct
                  </ul>
              </div>
          </div>

          <div class="row">
             <div class="col">
               <button
                 @click="edit(id)"
                 class="btn btn-warning "
               >
                 Edit
               </button>
               <button
                 type="button"
                 @click="goBack()"
                 name="button"
                 class="btn btn-default"
               >
                 Back
               </button>
             </div>
          </div>
      </div>
    </template>

    <script>
    import { get${capitalizedName} } from "@/services/${this.modelName}";

    export default {
      data() {
        return {
            id: '',
            ${this.modelName}: {}
        }
      },
      methods : {
        goBack() {
          this.$router.go(-1);
        },
        edit(id) {
          this.$router.push({ name: "${this.modelName}Edit", params: { id: id }});
        },
        setInstace() {
          get${capitalizedName}(this.id)
          .then((response) => {
            this.${this.modelName} = response.data;
          })
        }
      },
      created() {
        this.id = this.$route.params.id;
        this.setInstace();
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

      font-size: 0.8em;
    }
    .liTitle {
    text-transform: capitalize;
    }
    .breadcrumbs {
      background-color: white;
    }
    .breadcrumbs-active {
      text-decoration: underline;
      color: black;
      font-weight: bold;
    }
    button {
      margin: 8px;
      width: 30%;
      float: right;
    }
    </style>
    `;
    let viewStruct = "";
    for (var property in this.model) {
      if (this.model.hasOwnProperty(property)) {
        if (this.model[property].type === Types.HIDDEN_FIELDS) continue;

        if (
          this.model[property].type === Types.ONE_TO_MANY ||
          this.model[property].type === Types.ONE_TO_ONE
        ) {
          viewStruct += `
          <li v-if="${this.modelName}.${property}" class="list-group-item">
            <span class="liTitle">
              <strong> ${property}: </strong>
            </span><br>
            <vue-json-pretty :data="${this.modelName}.${property}" :showDoubleQuotes="false"
            >
            </vue-json-pretty>
          </li> \n`;
          continue;
        }

        viewStruct += `
        <li v-if="${this.modelName}.${property}" class="list-group-item">
          <span class="liTitle">
            <strong> ${property}: </strong>
          </span>{{${this.modelName}.${property}}}
        </li> \n`;
      }
    }
    template = template.replace(`viewStruct`, viewStruct);
    return template;
  }
};

module.exports = View;
