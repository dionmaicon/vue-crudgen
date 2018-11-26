process.argv.forEach((val, index) =>{
  console.log(`${index}: ${val}`);
});

var modelName = process.argv[2];


const fs = require('fs');
const model = require('./'+modelName +'.js');

fs.open(`./${modelName}Index.vue`, 'w+', (err, fd) => {
  if(fd){
    console.log(fd);
  }else {
    console.error(err);
  }
})

const templateHTMLBegin =
`
<template lang="html">
  <div id="${modelName}Form" class="container">
`;

let templateStruct = "";

const templateHTMLEnd =
`
  </div>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped>
label {
  text-transform: capitalize;
  float: left;
}
</style>

`;

for (var property in model) {
  if (model.hasOwnProperty(property)) {
    let prefix = property.split("_")[0];

    if(prefix){
        templateStruct += `\t<label for="${prefix}">${prefix}</label>\n`;
    }else{
        templateStruct += `\t<label for="${property}">${property}</label>\n`;
    }

    if (property.includes('select')) { //SELECT

      templateStruct += `\t<select id="${prefix}" v-model="${modelName}.${prefix}" class="form-control" >\n`;
      templateStruct += `\t\t<option v-for="option in ${modelName}.${prefix}.options" v-bind:value="option.value"> \n`;
      templateStruct += `\t\t\t{{option.text}}\n`;
      templateStruct += `\t\t</option>\n`;
      templateStruct += `\t</select>\n`;
      templateStruct += `\t<span> Selected: {{${modelName}.${prefix}}} </span>\n\n`;

    }else if (property.includes('textarea')) { //TEXTAREA

      templateStruct += `\t<textarea id="${prefix}" v-model="${modelName}.${prefix}" rows="10">You text here...</textarea>\n\n`;

    }else if (property.includes('radio')) { //TEXTAREA

      for (var option of model[property].options) {
          templateStruct += `\t<input type="radio" id="${option.id}" value="${option.value}" v-model="${modelName}.${prefix}">\n`
          templateStruct += `\t<label for="${option.id}">${option.value}</label><br>\n\n`
      }

    }else if (property.includes('checkbox')) { //TEXTAREA

      for (var option of model[property].options) {
          templateStruct += `\t<input type="checkbox" id="${option.id}" value="${option.value}" v-model="${modelName}.${prefix}">\n`
          templateStruct += `\t<label for="${option.id}">${option.value}</label><br>\n\n`
      }

    }else {

      templateStruct += `\t<input id="${property}" class="form-control" `;
      for (var htmlProp in model[property]) {
        if (model[property].hasOwnProperty(htmlProp)) {
          templateStruct += ` ${htmlProp}="${model[property][htmlProp]}" `;
        }
      }
      templateStruct += ` v-model="${modelName}.${property}">\n\n`;

    }

  }
}

console.log(templateHTMLBegin + templateStruct + templateHTMLEnd);
console.log(model);
