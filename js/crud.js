const fs = require("fs");
const path = require("path");
const capitalize = require("./libs/capitalize");

const Crud = class {
  constructor(config) {
    this.config = config;
    this.capitalName = capitalize(this.config.name);
  }

  generate() {
    this.generateView();
    this.generateForm();
    this.generateIndex();
    this.generateEdit();
    this.generateCreate();
    this.generateRoute();
    this.generateService();
    this.generateModule();
  }

  generateView() {
    const View = require(`./${this.config.frontend}/view.js`);
    const view = new View(
      this.config.name,
      this.config.model,
      this.config.resource
    );
    const viewTemplate = view.getTemplate();

    fs.writeFile(
      `${this.config.pathComponents}/${this.config.name}/${this.capitalName}View.vue`,
      viewTemplate,
      err => {
        if (err) {
          console.error(err);
        } else {
          console.log(
            `${this.capitalName}View template was create with success!`
          );
        }
      }
    );
  }

  generateForm() {
    const Form = require(`./${this.config.frontend}/form.js`);
    const form = new Form(
      this.config.name,
      this.config.model,
      this.config.resource
    );
    const formTemplate = form.getTemplate();

    fs.writeFile(
      `${this.config.pathComponents}/${this.config.name}/${this.capitalName}Form.vue`,
      formTemplate,
      err => {
        if (err) {
          console.error(err);
        } else {
          console.log("Form template was create with success!");
        }
      }
    );
  }

  generateIndex() {
    const Index = require(`./${this.config.frontend}/index.js`);
    const index = new Index(
      this.config.name,
      this.config.model,
      this.config.resource
    );
    const indexTemplate = index.getTemplate();

    fs.writeFile(
      `${this.config.pathComponents}/${this.config.name}/${this.capitalName}Index.vue`,
      indexTemplate,
      err => {
        if (err) {
          console.error(err);
        } else {
          console.log(
            `${this.capitalName}Index template was create with success!`
          );
        }
      }
    );
  }

  generateCreate() {
    const Create = require(`./${this.config.frontend}/create.js`);
    const create = new Create(
      this.config.name,
      this.config.model,
      this.config.resource
    );
    const createTemplate = create.getTemplate();

    fs.writeFile(
      `${this.config.pathComponents}/${this.config.name}/${this.capitalName}Create.vue`,
      createTemplate,
      err => {
        if (err) {
          console.error(err);
        } else {
          console.log(
            `${this.capitalName}Create template was create with success!`
          );
        }
      }
    );
  }

  generateEdit() {
    const Edit = require(`./${this.config.frontend}/edit.js`);
    const edit = new Edit(
      this.config.name,
      this.config.model,
      this.config.resource
    );
    const editTemplate = edit.getTemplate();

    fs.writeFile(
      `${this.config.pathComponents}/${this.config.name}/${this.capitalName}Edit.vue`,
      editTemplate,
      err => {
        if (err) {
          console.error(err);
        } else {
          console.log(
            `${this.capitalName}Edit template was create with success!`
          );
        }
      }
    );
  }

  generateRoute() {
    const Router = require(`./router/router.js`);
    const router = new Router(this.config.name);
    const routerTemplate = router.getTemplate();
    fs.writeFile(
      `${this.config.pathRoutes}/${this.config.name}.js`,
      routerTemplate,
      err => {
        if (err) {
          console.error(err);
        } else {
          console.log("Router file was create with success!");
        }
      }
    );
  }

  generateService() {
    const Service = require(`./service/service.js`);
    const service = new Service(this.config);
    const serviceTemplate = service.getTemplate();
    fs.writeFile(
      `${this.config.pathServices}/${this.config.name}.js`,
      serviceTemplate,
      err => {
        if (err) {
          console.error(err);
        } else {
          console.log("Service file was create with success!");
        }
      }
    );
  }

  generateModule() {
    const Module = require(`./store/module.js`);
    const module = new Module(this.config);
    const moduleTemplate = module.getTemplate();
    fs.writeFile(
      `${this.config.pathStoreModules}/${this.config.name}.js`,
      moduleTemplate,
      err => {
        if (err) {
          console.error(err);
        } else {
          console.log("Module file was create with success!");
        }
      }
    );
  }
};

module.exports = Crud;
