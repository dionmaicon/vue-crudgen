#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const commander = require("commander");
const { exec } = require("child_process");

const Crud = require("./js/crud.js");
const Init = require("./js/init.js");

const config = {
  pathRoutes: path.join(process.cwd(), "src/routes"),
  pathComponents: path.join(process.cwd(), "src/components"),
  pathModels: path.join(process.cwd(), "src/models"),
  pathServices: path.join(process.cwd(), "src/services"),
  pathStore: path.join(process.cwd(), "src/store"),
  pathViews: path.join(process.cwd(), "src/views"),
  pathStoreModules: path.join(process.cwd(), "src/store/modules"),
  pathHelpers: path.join(process.cwd(), "src/helpers"),
  uniqueFile: null,
  vuetify: null,
  bootstrap: null
};

const createBaseFolders = () => {
  let paths = [];
  paths.push(config.pathRoutes);
  paths.push(config.pathModels);
  paths.push(config.pathComponents);
  paths.push(config.pathStore);
  paths.push(config.pathViews);
  paths.push(config.pathHelpers);
  paths.push(config.pathStoreModules);
  paths.push(config.pathServices);

  paths.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
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

    for (let i = 0; i < files.length; i++) {
      let file = config.pathModels + "/" + files[i];
      let name = path.basename(file, ".js");
      models.push(name);
      await createFiles(name, file);
    }
    return models;
  } catch (e) {
    console.error(`Path to models looks bad. Try again with new path`);
    process.exit(-1);
  }
};

const initModel = async () => {
  try {
    let file = config.uniqueFile;
    let name = path.basename(file, ".js");
    await createFiles(name, file);
  } catch (e) {
    console.error(`Path to model looks bad. Try again with new path`);
  }
};

const initApp = async () => {
  try {
    if (config.bootstrap) {
      config.frontend = "bootstrap";
    } else {
      config.frontend = "vuetify";
    }

    const init = new Init(config);
    init.generate();
  } catch (e) {
    console.error(`Models cannot to be generate, we have some problem.`);
    console.error(e);
  }
};

const createTemplates = async (name, model, resource) => {
  let crud;

  config.name = name;
  config.model = model;
  config.resource = resource;

  if (config.bootstrap) {
    config.frontend = "bootstrap";
  } else {
    config.frontend = "vuetify";
  }

  crud = new Crud(config);
  crud.generate();
};

const InstallLocalDependecies = async () => {
  try {
    if (config.bootstrap) {
      const child = exec(
        `npm install --save bootstrap axios v-money vue-the-mask vue-multiselect vuex-persist vue-json-pretty @fortawesome/fontawesome-free`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(error);
          }
          console.log(stdout);
        }
      );
    } else {
      config.frontend = "vuetify";
      const child = exec(
        "npm install --save vuetify axios v-money vue-the-mask vue-multiselect vuex-persist vue-json-pretty",
        (error, stdout, stderr) => {
          if (error) {
            console.error(error);
          }
          console.log(stdout);
        }
      );
    }
  } catch (e) {
    console.error(`Models cannot to be generate, we have problems here.`);
    console.error(e);
  }
};

async function main() {
  const program = new commander.Command();

  program.version("TryUS. Software | CRUD Generator Vue.js Version: 0.0.4");
  program
    // .option("-v, --vuetify", "Scaffold Vuetify Templates.")
    .option("-b, --bootstrap", "Scaffold Bootstrap Templates (Default).")
    .option("-m, --models <path>", "Generate views for all models in path.")
    .option("-u, --unique <path>", "Generate  for an unique model.")
    .option("-i, --init ", "Init files to src scaffold.");

  program.parse(process.argv);

  if (program.vuetify) {
    config.vuetify = true;
  }

  if (program.bootstrap || config.vuetify === null) {
    config.bootstrap = true;
  }

  if (program.models) {
    config.pathModels = path.join(
      process.cwd(),
      path.normalize(program.models)
    );
  }

  if (program.unique) {
    config.uniqueFile = path.join(
      process.cwd(),
      path.normalize(program.unique)
    );
  }

  if (program.init) {
    createBaseFolders();
    await initApp();
    await InstallLocalDependecies();
  }

  if (program.models) {
    let models = await initModels();
  }

  if (program.unique) {
    await initModel();
  }

  const childLintVue = exec(
    "npx eslint --fix --ext=vue ./src/",
    (error, stdout, stderr) => {
      // if (error) {
      //   throw error;
      // }
      // console.log(stdout);
      console.log(stdout);
    }
  );

  const childLintJs = exec(
    "npx eslint --fix --ext=js ./src/",
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
