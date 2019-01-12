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
      if(property.includes('hide')) continue; //if property includes 'hide'in your text  this loop skip once

      if (this.model.hasOwnProperty(property)) {
        let prefix = property.split("_")[0];

        if(prefix){
            templateStruct += `\t<div class="form-group">\n\t\t<label for="${prefix}">${prefix}</label><br>\n`;
        }else{
            templateStruct += `\t<div class="form-group">\n\t\t<label for="${property}">${property}</label>\n`;
        }

        if (property.includes('select')) { //SELECT
          templateStruct += `<div class="col-12">\n`
          templateStruct += `\t<select id="${prefix}" v-model="${this.modelName}.${prefix}.selected" class="form-control" >\n`;
          templateStruct += `\t\t<option v-for="option in ${this.modelName}.${prefix}.options" :key="option.value" v-bind:value="option.value"> \n`;
          templateStruct += `\t\t\t{{option.text}}\n`;
          templateStruct += `\t\t</option>\n`;
          templateStruct += `\t</select>\n</div>\n`;

        }else if (property.includes('textarea')) { //TEXTAREA

          templateStruct += `\t<textarea id="${prefix}" style="width: 100%" v-model="${this.modelName}.${prefix}" rows="10">You text here...</textarea>\n\n`;

        }else if (property.includes('radio')) { //Radio buttons

          for (var option of this.model[property].options) {
              templateStruct += `\t<input type="radio" id="${option.id}" value="${option.value}" v-model="${this.modelName}.${prefix}">\n`
              templateStruct += `\t<label for="${option.id}">${option.value}</label><br>\n\n`
          }

        }else if (property.includes('checkbox')) { //TEXTAREA

          for (var option of this.model[property].options) {
              templateStruct += `\t<input type="checkbox" id="${option.id}" value="${option.value}" v-model="${this.modelName}.${prefix}">\n`
              templateStruct += `\t<label for="${option.id}">${option.value}</label><br>\n\n`
          }

        }else if (property.includes('file')) { //TEXTAREA
              templateStruct += `\t<input type="file" id="${prefix}"  v-on:change="${prefix}OnFileChange">\n`
              countFiles++;
        }else {
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

  export default {
    props: ["id"],
    data () {
      return {
        ${this.modelName}: {
          dataScript
        }
      }
    },
    created(){
      eventBus.changeModalState();
      this.setInstace();
    },
    methods: {
      methodsScript
      handleSubmit(){
        if(this.id){
          //Implements here your submit method UPDATE
        }else {
          //Implements here your submit method CREATE
        }
      },
      goBack(){
        this.$router.go(-1);
      },
      setInstace(){
        if(this.id){
          this.$http.get("${this.resource.endPoint}?id="+this.id)
            .then(response => {
              let instance = response.data[0];
              for (var prop in instance) {
                if (instance.hasOwnProperty(prop) && this.${this.modelName}.hasOwnProperty(prop)) {
                  // if (prop == 'gender'){
                  //     this.${this.modelName}[prop].selected = instance[prop];
                  //     continue;
                  // }
                  this.${this.modelName}[prop] = instance[prop];
                }
              }
            })
        }
      }
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

    let dataScript = ``;
    for (var property in this.model) {
      if (this.model.hasOwnProperty(property)) {
        let prefix = property.split("_")[0];
        if(property.includes('hide')) continue; //If contains word hide continue loop for next iteration

        if(property.includes('select')){
            dataScript += `${prefix}: ${JSON.stringify(this.model[property])},\n`
        }
        else if( property.includes('checkbox')){
            dataScript += `${prefix}: [],\n`
        }else if(property.includes('radio') || property.includes('textarea')){
            dataScript += `${prefix}: '',\n`
        }
        else{
            dataScript += `${property}: '',\n`
        }
      }
    }

    let methodsScript = ``;
    if(countFiles > 0){
      for (var property in this.model) {
        if (this.model.hasOwnProperty(property)) {
          if(property.includes('file')){
              let prefix = property.split("_")[0];
              methodsScript += `
              ${prefix}OnFileChange(e){
                let files = e.target.files || e.dataTransfer.files;
                if(files.length){
                  this.${this.modelName}.${prefix} = files[0];
                }
              },
              `;
          }
        }
      }
    }

    //Template Struct Buttons
    templateStruct +=
    `
    <button v-if="id" type="submit"  name="buttonUpdate" class="btn btn-primary " >Update</button>
    <button v-else type="submit"  name="buttonCreate" class="btn btn-success " >Save</button>
    <button  type="button" @click="goBack" name="button" class="btn btn-default" >Back</button>
    `;

    let template = templateHTMLBegin + templateStruct + templateHTMLEnd;
    script = script.replace(`dataScript`,  dataScript);
    script = script.replace(`methodsScript`, methodsScript);
    return template + script ;
  }
}

module.exports = Form;
