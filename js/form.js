/* eslint-disable */
const Form = class {

  constructor(name, model, resource){
    this.modelName = name;
    this.model = model;
    this.resource = resource;
  }

  getTemplate(){

    let templateHTMLBegin =
      `<template >
        <div id="${this.modelName}Form" class="form">
          <form @submit.prevent="handleSubmit">
      `;

    let templateStruct = "";

    let templateHTMLEnd =
      `   </form>
        </div>
      </template>
      `;
    let countFiles = 0;
      //Template Struct
    for (var property in this.model) {
      if(property.includes('hidden_fields')) continue; //if property includes 'hide'in your text  this loop skip once

      if (this.model.hasOwnProperty(property)) {
        // types: number, text, select, currency, radio, checkbox, oneToOne, object, html
        templateStruct += `\t<div class="form-group">\n\t\t<label for="${property}">${property}</label>\n`;


        if (this.model[property].type == 'select') { //SELECT
          templateStruct += `<div class="col-12">\n`
          templateStruct += `\t<select id="${property}" v-model="${this.modelName}.${property}.selected" class="form-control" >\n`;
          templateStruct += `\t\t<option v-for="option in ${this.modelName}.${property}.options" :key="option.id" v-bind:value="option.id"> \n`;
          templateStruct += `\t\t\t{{option.value}}\n`;
          templateStruct += `\t\t</option>\n`;
          templateStruct += `\t</select>\n</div>\n`;

        } else if (this.model[property].type == 'textarea') { //TEXTAREA

          templateStruct += `\t<textarea id="${property}" style="width: 100%" v-model="${this.modelName}.${property}" rows="10">You text here...</textarea>\n\n`;

        } else if (this.model[property].type == 'radio') {

          for (var option of this.model[property].options) {
              templateStruct += `\t<input type="radio" id="${option.id}" value="${option.value}" v-model="${this.modelName}.${property}">\n`
              templateStruct += `\t<label for="${option.id}">${option.value}</label><br>\n\n`
          }

        } else if (this.model[property].type == 'checkbox') {

          for (var option of this.model[property].options) {
              templateStruct += `\t<input type="checkbox" id="${option.id}" value="${option.value}" v-model="${this.modelName}.${property}">\n`
              templateStruct += `\t<label for="${option.id}">${option.value}</label><br>\n\n`
          }

        } else if (this.model[property].type == 'file') {
              templateStruct += `\t<input type="file" id="${property}"  v-on:change="${property}OnFileChange">\n`
              countFiles++;
        } else if (this.model[property].type == 'oneToOne' || this.model[property].type == 'oneToMany') {
              templateStruct += `\t`
              if (this.model[property].type == 'oneToOne') {
                templateStruct += `<select v-model="${this.modelName}.relations.${property}">\n`;
              } else {
                templateStruct += `<select v-model="${this.modelName}.relations.${property}" multiple>\n`;
              }
              `<option v-for="option in ${this.modelName}.${property}" v-bind:value="option">\n
                  {{ option.${this.model[property].attribute} }}\n
                </option>\n
              </select>\n`;
        } else if (this.model[property].type == 'html') {
              templateStruct += `\t
              <quill-editor
                v-model="${this.modelName}.${property}"
                ref="myQuillEditor"
                :options="{}"
              />
              \n`
        } else if (this.model[property].type == 'currency') {
              templateStruct += `\t
              <money
                id="valorVenda"
                class="form-control"
                v-model.lazy="${this.modelName}.${property}"
              />\n`
        } else if (this.model[property].type == 'object') {
              templateStruct += `\t<input id="${property}" class="form-control" v-model="${this.modelName}.${property}.${this.model[property].attribute}">
              \n`
        } else {
              templateStruct += `\t<input id="${property}" class="form-control" `;
              for (var htmlProp in this.model[property]) {
                if (this.model[property].hasOwnProperty(htmlProp)) {
                  templateStruct += ` ${htmlProp}="${this.model[property][htmlProp]}" `;
                }
              }
              templateStruct += ` v-model="${this.modelName}.${property}">\n\n`;
        }

      }
      templateStruct += `</div>\n`
    }

    let script =
`
<script>
  import {eventBus} from '../../main.js';
  dataImport


  export default {
    props: ["id"],
    data () {
      return {
        ${this.modelName}: {
          relations: {
            relationsScript
          },
          dataScript
        }
      }
    },
    created(){
      this.$endPoint.addUrl("${this.resource.prodPoint}","${this.resource.devPoint}", "${this.modelName}");
      eventBus.changeModalState();
      this.setInstace();
    },
    methods: {
      methodsScript
      async handleSubmit(){
        if(this.id){
          //Implements here your submit method UPDATE
          /**
          * type equals 0 means that this modal disappear automatically after 1500 milliseconds
          * type equals 1 means that this modal  will have button close without timer
          * type equals 2 means that this modal will have button close and ok without timer
          */
          let option = await this.$modal.show({title: "Warning", message: "Do you have sure that want complete this updated?", alert: "warning", type: 2});
          if (option){
            let ${this.modelName} = this.${this.modelName};
            //Uncomment and replace property for you select property
            //${this.modelName}.property = this.${this.modelName}[property].selected;

            this.$http.put(this.$endPoint.getUrlByName("${this.modelName}") + "/" + this.id, ${this.modelName})
            .then( (response) => {
              if (response.status == 200) {
                  this.$modal.show({title: "Success", message: "${ this.modelName} was updated with successfull!", alert: "success"});
                  this.goBack();
              }

            }).catch(error => {
              this.$modal.show({title: "Error", message: "Server response with error" + error, alert: "danger", type: 1});
            });
          }
          return
        }else {
          //Implements here your submit method CREATE
          let option = await this.$modal.show({title: "Warning", message: "Do you want to continue?", alert: "warning", type: 2});
          if (option){
            let ${this.modelName} = this.${this.modelName};
            //Uncomment and replace property for you select property
            //${this.modelName}.property = this.${this.modelName}[property].selected;

            this.$http.post(this.$endPoint.getUrlByName("${this.modelName}"), ${this.modelName})
            .then( (response) => {
                if(response.status == 201){
                  this.$modal.show({title: "Success", message: "${this.modelName} was created with successfull!", alert: "success"});
                  this.goBack();
                }
            }).catch(error => {
              this.$modal.show({title: "Error", message: "Server response with error" + error, alert: "danger", type: 1});
            })
          }

        }
      },
      goBack(){
        this.$router.go(-1);
      },
      setInstace(){
        if(this.id){
          this.$http.get(this.$endPoint.getUrlByName("${this.modelName}") + "/" + this.id)
            .then(response => {
              let instance = response.data;
              for (var property in instance) {
                if (instance.hasOwnProperty(property) && this.${this.modelName}.hasOwnProperty(property)) {
                  dataTypes
                  this.${this.modelName}[property] = instance[property];
                }
              }
            })
        }
      }
    },
    components: {
      dataComponent
    }
  }
</script>
<style lang="css" scoped>
  label {
    text-transform: capitalize;
  }
  button {
    margin: 8px;
    width: 30%;
    float: right;
  }
  form {
    overflow: hidden;
  }
</style>

`;

    let dataImport = ``;
    let dataComponent = ``;

    for (var property in this.model) {
      if (this.model.hasOwnProperty(property)) {

        if (property.includes('hidden_fields')) continue; //If contains word hide continue loop for next iteration

        if (this.model[property].type == 'html') {
          if (dataImport == '') {
            dataImport += `
            import "quill/dist/quill.core.css";
            import "quill/dist/quill.snow.css";
            import "quill/dist/quill.bubble.css";

            import { quillEditor } from "vue-quill-editor";`
            dataComponent += 'quillEditor';
          }
        }
      }
    }


    let dataScript = ``;
    let relationsScript = ``;

    for (var property in this.model) {
      if (this.model.hasOwnProperty(property)) {

        if (property.includes('hidden_fields')) continue; //If contains word hide continue loop for next iteration

        if (this.model[property].type == 'select') {
            dataScript += `${property}: ${JSON.stringify(this.model[property])},\n`
        } else if ( this.model[property].type == 'object') {
            dataScript += `${property}: {},\n`
        } else if ( this.model[property].type == 'checkbox') {
            dataScript += `${property}: [],\n`
        } else if ( this.model[property].type == 'oneToOne' || this.model[property].type == 'oneToMany') {
            relationsScript += `${property}: [],\n`
            dataScript += `${property}: [],\n`
        }else if (this.model[property].type == 'radio' || this.model[property].type == 'textarea' || this.model[property].type == 'file') {
            dataScript += `${property}: '',\n`
        } else {
            dataScript += `${property}: '',\n`
        }
      }
    }

    let methodsScript = ``;

    if (countFiles > 0) {
      for (var property in this.model) {
        if (this.model.hasOwnProperty(property)) {
          if(this.model[property].type == 'file') {
              methodsScript += `
              ${property}OnFileChange(e){
                let files = e.target.files || e.dataTransfer.files;
                if(files.length){
                  this.${this.modelName}.${property} = files[0];
                }
              },
              `;
          }
        }
      }
    }

    let dataTypes = `
    if (property == dataSubType) {
      this.${this.modelName}[property].selected = instance[property];
      continue;
    }\n`;

    let dataSubTypes = ``;

    for (var property in this.model) {
      if (this.model.hasOwnProperty(property)) {
        if(this.model[property].type == 'select') {
            if(dataSubTypes == '') {
                dataSubTypes += `${property} `;
            } else {
              dataSubTypes += ` || ${property} \t`;
            }
        }
      }
    }

    if (dataSubTypes != '') {
      dataTypes = dataTypes.replace('dataSubType', dataSubTypes);
    } else {
      dataTypes = ``;
    }

    //Template Struct Buttons
    templateStruct +=
    `
    <button v-if="id" type="submit"  name="buttonUpdate" class="btn btn-primary " >Update</button>
    <button v-else type="submit"  name="buttonCreate" class="btn btn-success " >Save</button>
    <button  type="button" @click="goBack" name="button" class="btn btn-default" >Back</button>
    `;

    let template = templateHTMLBegin + templateStruct + templateHTMLEnd;
    script = script.replace(`relationsScript`,  relationsScript);
    script = script.replace(`dataScript`,  dataScript);
    script = script.replace(`methodsScript`, methodsScript);
    script = script.replace(`dataImport`, dataImport);
    script = script.replace(`dataComponent`, dataComponent);
    script = script.replace(`dataTypes`, dataTypes);
    return template + script ;
  }
}

module.exports = Form;
