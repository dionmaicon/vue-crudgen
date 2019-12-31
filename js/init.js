const fs = require("fs");
const path = require("path");
const IndexRouter = require("./router/indexRouter.js");
const HttpService = require("./service/httpService.js");
const IndexStore = require("./store/indexStore.js");
const IndexModule = require("./store/indexModule.js");
const Eslintrc = require("./eslint/eslintrc.js");

const Init = class {
  constructor(config) {
    this.config = config;
  }

  generate() {
    this.createRouterStruct();
    this.createIndexRoutesStruct();
    this.createServicesStruct();
    this.createStoreStruct();
    this.createModulesStruct();
    this.createTemplateAlert();
    this.createTemplateMain();
    this.createTemplateEslintrc();
  }

  async createIndexRoutesStruct() {
    const indexRouter = new IndexRouter();
    const indexTemplate = indexRouter.getIndexRouterTemplate();
    fs.writeFile(this.config.pathRoutes + "/index.js", indexTemplate, err => {
      if (err) {
        console.error(err);
      } else {
        console.log("Routes Index file was create with success!");
      }
    });
  }

  async createRouterStruct() {
    const indexRouter = new IndexRouter();
    const indexTemplate = indexRouter.getRouterTemplate();
    fs.writeFile(this.config.pathRouter + "/index.js", indexTemplate, err => {
      if (err) {
        console.error(err);
      } else {
        console.log("Router Index file was create with success!");
      }
    });
  }

  async createServicesStruct() {
    const httpService = new HttpService();
    const httpTemplate = httpService.getTemplate();
    fs.writeFile(
      this.config.pathServices + "/httpService.js",
      httpTemplate,
      err => {
        if (err) {
          console.error(err);
        } else {
          console.log("Service Init file was create with success!");
        }
      }
    );
  }

  async createStoreStruct() {
    const indexStore = new IndexStore();
    const indexTemplate = indexStore.getTemplate();
    fs.writeFile(this.config.pathStore + "/index.js", indexTemplate, err => {
      if (err) {
        console.error(err);
      } else {
        console.log("Index Store file was create with success!");
      }
    });
  }

  async createModulesStruct() {
    const indexModule = new IndexModule();
    const indexTemplate = indexModule.getTemplate();
    fs.writeFile(
      this.config.pathStoreModules + "/index.js",
      indexTemplate,
      err => {
        if (err) {
          console.error(err);
        } else {
          console.log("Index Module file was create with success!");
        }
      }
    );
  }

  async createTemplateAlert() {
    const Alert = require(`./${this.config.frontend}/helpers/alert.js`);
    const alert = new Alert();
    const alertTemplate = await alert.getTemplate();

    fs.writeFile(this.config.pathHelpers + "/alert.vue", alertTemplate, err => {
      if (err) {
        console.error(err);
      } else {
        console.log("Alert file was create with success!");
      }
    });
  }

  createTemplateMain() {
    const MainFile = require(`./${this.config.frontend}/helpers/mainFile.js`);
    const mainF = new MainFile();
    const mainTemplate = mainF.getTemplate();
    fs.writeFile(process.cwd() + "/src/main.js", mainTemplate, err => {
      if (err) {
        console.error(err);
      } else {
        console.log("Main file was create with success!");
      }
    });
  }

  createTemplateApp() {
    const App = require(`./${this.config.frontend}/helpers/app.js`);
    const app = new App();
    const appTemplate = app.getTemplate();
    fs.writeFile(process.cwd() + "/src/App.vue", appTemplate, err => {
      if (err) {
        console.error(err);
      } else {
        console.log("App file was create with success!");
      }
    });
  }

  createTemplateHome(models) {
    const Home = require(`./${this.config.frontend}/helpers/home.js`);
    const home = new Home(models);
    const homeTemplate = home.getTemplate();

    fs.writeFile(process.cwd() + "/src/views/Home.vue", homeTemplate, err => {
      if (err) {
        console.error(err);
      } else {
        console.log("Home template file was create with success!");
      }
    });
  }

  createTemplateMenu(models) {
    const Menu = require(`./${this.config.frontend}/helpers/menu.js`);
    const menu = new Menu(models);
    const menuTemplate = menu.getTemplate();

    fs.writeFile(process.cwd() + "/src/menu.vue", menuTemplate, err => {
      if (err) {
        console.error(err);
      } else {
        console.log("Menu template file was create with success!");
      }
    });
  }

  async createTemplateEslintrc() {
    const eslintrc = new Eslintrc();
    const eslintrcTemplate = eslintrc.getTemplate();
    fs.writeFile("./.eslintrc.js", eslintrcTemplate, err => {
      if (err) {
        console.error(err);
      } else {
        console.log("eslintrc.js file was create with success!");
      }
    });
  }
};

module.exports = Init;
