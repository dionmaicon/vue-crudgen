#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const Create = require("./js/create.js");
const Edit = require("./js/edit.js");
const Form = require("./js/form.js");
const Index = require("./js/index.js");
const View = require("./js/view.js");
const Router = require("./js/helpers/router.js");
const Home = require("./js/helpers/home.js");
const Alert = require("./js/helpers/alert.js");
const MainFile = require("./js/helpers/mainFile.js");
const App = require("./js/helpers/app.js");
const Menu = require("./js/helpers/menu.js");

const { exec } = require("child_process");

const config = {
  pathRoutes: process.cwd(),
  pathComponents: path.join(process.cwd(), "src/components"),
  pathModels: process.cwd(),
  uniqueFile: null
};

const createFolder = (name, basePath) => {
  let dir = `${basePath}/${name}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const createFiles = (name, file) => {
  fs.stat(file, function(err, stats) {
    let basePath = config.pathComponents;
    createFolder(name, basePath);
    const { model, resource } = require(file);
    if (model == null || resource == null) {
      console.error(`Template model "${name}" has sintax error.`);
      process.exit(-1);
    }
    createTemplates(name, model, resource);
  });
};

const initModels = async () => {
  try {
    let models = [];
    let files = fs.readdirSync(config.pathModels);

    if(config.uniqueFile == null) {
      for (let i = 0; i < files.length; i++) {
        let file = config.pathModels + "/" + files[i];
        let name = path.basename(file, ".js");
        models.push(name);
        await createFiles(name, file);
      }
      return models;
    } else {
      let file = config.pathModels + "/" + config.uniqueFile + ".js";
      await createFiles(config.uniqueFile, file);
    }
    return null;
  } catch (e) {
    console.error(`Path to models looks bad. Try again with new path`);
    process.exit(-1);
  }
};

const createTemplateAlert = async () => {
  const alert = new Alert();
  const alertTemplate = await alert.getTemplate();
  let basePath = config.pathRoutes;
  await createFolder("helpers", basePath);
  fs.writeFile(`${config.pathRoutes}/helpers/alert.vue`, alertTemplate, err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Alert file was create with success!");
    }
  });
};

const createTemplateEslint = () =>{
  let template =
  `
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
  `
  fs.writeFile("" + process.cwd() + "/.eslintrc.js", template, err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Router file was create with success!");
    }
  });
}

const createTemplateRouter = models => {
  const router = new Router(models);
  const routerTemplate = router.getTemplate();
  fs.writeFile(`${config.pathRoutes}/router.js`, routerTemplate, err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Router file was create with success!");
    }
  });
};

const createTemplateMain = models => {
  const mainF = new MainFile();
  const mainTemplate = mainF.getTemplate();
  fs.writeFile(`${config.pathRoutes}/main.js`, mainTemplate, err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Main file was create with success!");
    }
  });
};

const createTemplateApp = models => {
  const app = new App();
  const appTemplate = app.getTemplate();
  fs.writeFile(`${config.pathRoutes}/App.vue`, appTemplate, err => {
    if (err) {
      console.error(err);
    } else {
      console.log("App file was create with success!");
    }
  });
};

const createTemplateHome = models => {
  const home = new Home(models);
  const homeTemplate = home.getTemplate();

  fs.writeFile(`${config.pathComponents}/home.vue`, homeTemplate, err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Home template file was create with success!");
    }
  });
};

const createTemplateMenu = models => {
  const menu = new Menu(models);
  const menuTemplate = menu.getTemplate();

  fs.writeFile(`${config.pathComponents}/menu.vue`, menuTemplate, err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Menu template file was create with success!");
    }
  });
};

const createTemplates = async (name, model, resource) => {
  const modelName = name;
  const form = new Form(modelName, model, resource);
  const formTemplate = form.getTemplate();

  fs.writeFile(
    `${config.pathComponents}/${modelName}/${modelName}Form.vue`,
    formTemplate,
    err => {
      if (err) {
        console.error(err);
      } else {
        console.log("Form template was create with success!");
      }
    }
  );

  const create = new Create(modelName, model, resource);
  const createTemplate = create.getTemplate();

  fs.writeFile(
    `${config.pathComponents}/${modelName}/${modelName}Create.vue`,
    createTemplate,
    err => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${modelName}Create template was create with success!`);
      }
    }
  );

  const edit = new Edit(modelName, model, resource);
  const editTemplate = edit.getTemplate();

  fs.writeFile(
    `${config.pathComponents}/${modelName}/${modelName}Edit.vue`,
    editTemplate,
    err => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${modelName}Edit template was create with success!`);
      }
    }
  );

  const index = new Index(modelName, model, resource);
  const indexTemplate = index.getTemplate();

  fs.writeFile(
    `${config.pathComponents}/${modelName}/${modelName}Index.vue`,
    indexTemplate,
    err => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${modelName}Index template was create with success!`);
      }
    }
  );

  const view = new View(modelName, model, resource);
  const viewTemplate = view.getTemplate();

  fs.writeFile(
    `${config.pathComponents}/${modelName}/${modelName}View.vue`,
    viewTemplate,
    err => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${modelName}View template was create with success!`);
      }
    }
  );
};

async function main() {
  if (process.argv.length < 2) {
    console.error("Usage: " + __filename + " path/to/models");
    process.exit(-1);
  }

  config.pathModels = path.join(process.cwd(), path.normalize(process.argv[2]));
  //HELP
  process.argv.forEach((val, index) => {
    if (val == "-h" || val == "--help") {
      console.log("\n\tTryUs. Software CRUD Generator Vue.js\n");
      console.log("-h or --help \n\t  Help options. \n");
      console.log("-c or --components \n\t  Path to gz components.\n");
      console.log("-m or --models \n\t  Path to models source files.\n");
      console.log("-a or --all \n\t  Path to src files. \n\tAll files necessary will be generate: Home.vue, Alert.vue, Menu.vue, main.js, etc.  \n");
      console.log("-v or --vue \n\t  Path to generate main.js and App.vue.\n");

      process.exit(-1);
    }
  });
  //Adjust params to App.vue and main.js files
  process.argv.forEach((val, index) => {
    if (val == "-v" || val == "--vue") {
      if (process.argv[index + 1] == null) {
        config.pathRoutes = process.cwd();
      } else {
        config.pathRoutes = path.join( process.cwd() , path.normalize(process.argv[index + 1]));
      }
      createTemplateApp();
      createTemplateMain();
    }
  });

  process.argv.forEach((val, index) => {
    if (val == "-u" || val == "--unique") {
      if (process.argv[index + 1] == null) {
        console.error("Model not set.");
        process.exit(-1);
      } else {
        config.uniqueFile = process.argv[index + 1];
      }
    }
  });

  //Adjust params to components folder output
  process.argv.forEach((val, index) => {
    if (val == "-c" || val == "--components") {
      if (process.argv[index + 1] == null) {
        config.pathComponents = process.cwd();
      } else {
        config.pathComponents = path.join( process.cwd() , path.normalize(process.argv[index + 1]));
      }
    }
  });

  process.argv.forEach((val, index) => {
    if (val == "-m" || val == "--models") {
      if (process.argv[index + 1] == null) {
        config.pathModels = process.cwd();
      } else {
        config.pathModels = path.join( process.cwd() , path.normalize(process.argv[index + 1]));
      }
    }
  });

  let models = await initModels();

  if (process.argv.length >= 3) {
    process.argv.forEach((val, index) => {
      if (val == "-a" || val == "--all") {
        if (process.argv[index + 1] == null) {
          config.pathRoutes = process.cwd();
        } else {
          config.pathRoutes = path.join( process.cwd(), path.normalize(process.argv[index + 1]));
        }
        if(config.uniqueFile == null){
          createTemplateRouter(models, config);
          createTemplateHome(models);
          createTemplateMenu(models);
          createTemplateMain();
          createTemplateApp();
          createTemplateAlert();
          createTemplateEslint();
        }
      }
    });
  }

  const child = exec(
    "npx eslint --fix --ext=vue " + config.pathComponents + "/",
    (error, stdout, stderr) => {
      // if (error) {
      //   throw error;
      // }
      // console.log(stdout);
      console.log(stdout);
    }
  );
}

main();
