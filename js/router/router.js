const capitalize = require("../libs/capitalize");

const Router = class {
  constructor(model) {
    this.model = model;
    this.capitalName = capitalize(model);
  }

  getTemplate() {
    let template = `
    import ${this.capitalName}View from "@/components/${this.model}/${this.capitalName}View.vue";
    import ${this.capitalName}Index from "@/components/${this.model}/${this.capitalName}Index.vue";
    import ${this.capitalName}Edit from "@/components/${this.model}/${this.capitalName}Edit.vue";
    import ${this.capitalName}Create from "@/components/${this.model}/${this.capitalName}Create.vue";

    const ${this.model} = {
      path: "/${this.model}",
      name: "${this.model}",
      component: ${this.capitalName}Index,
      children: [
        { path: "view/:id", component: ${this.capitalName}View , name: "${this.model}View" },
        { path: "edit/:id", component: ${this.capitalName}Edit , name: "${this.model}Edit" },
        { path: "create", component: ${this.capitalName}Create , name: "${this.model}Create"}
      ]
    };

    export default ${this.model};
    `;
    return template;
  }
};

module.exports = Router;
