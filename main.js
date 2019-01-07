const fs = require("fs");
const path = require("path");
const Create = require('./js/create.js');
const Edit = require('./js/edit.js');
const Form = require('./js/form.js');
const Index = require('./js/index.js');
const View = require('./js/view.js');
const Router = require('./js/router.js');
const Home = require('./js/home.js');

const config = {
   pathRoutes: "./",
   pathComponents: "./components",
   pathModels: "./"
};

const createFolder = (name) => {
      let dir = `${config.pathComponents}/${name}`;
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir, {recursive: true});
      }
}

const createFiles = (name, file) => {
    fs.stat(file, function(err, stats) {
        createFolder(name);
        const {model, resource} = require(file);
        if(model == null || resource == null){
            console.error(`Template model "${name}" has sintax error.`);
            process.exit(-1);
        }
        createTemplates(name, model, resource);
    });
}

const initModels = async () => {
  console.log(config);
  try {
      let models = [];
      let files = fs.readdirSync(config.pathModels);

      for (let i=0; i < files.length; i++) {
          let file = config.pathModels + '/' + files[i];
          let name = path.basename(file, ".js");
          models.push(name);
          await createFiles(name, file);
      }
      return models;

  } catch (e) {
    console.error(`Path to models looks bad. Try again with new path`);
    process.exit(-1);
  }
}

const createTemplateRouter = (models, config) => {
    const router = new Router(models);
    const routerTemplate = router.getTemplate();
    fs.writeFile(`${config.path}/router.js`, routerTemplate, (err) => {
      if(err){
        console.error(err);
      }else {
        console.log("Router file was create with success!");
      }
    });
}

const createTemplateHome = (models) => {
  const home = new Home(models);
  const homeTemplate = home.getTemplate();

  fs.writeFile(`${config.pathComponents}/home.vue`, homeTemplate, (err) => {
    if(err){
      console.error(err);
    }else {
      console.log("Home template file was create with success!");
    }
  });
}

const createTemplates = async (name, model, resource) => {

    const modelName = name;
    const form = new Form(modelName, model, resource);
    const formTemplate = form.getTemplate();

    fs.writeFile(`${config.pathComponents}/${modelName}/${modelName}Form.vue`, formTemplate , (err) => {
      if(err){
        console.error(err);
      }else {
        console.log("Form template was create with success!");
      }
    });

    const create = new Create(modelName, model, resource);
    const createTemplate = create.getTemplate();

    fs.writeFile(`${config.pathComponents}/${modelName}/${modelName}Create.vue`, createTemplate , (err) => {
      if(err){
        console.error(err);
      }else {
        console.log(`${modelName}Create template was create with success!`);
      }
    });

    const edit = new Edit(modelName, model, resource);
    const editTemplate = edit.getTemplate();

    fs.writeFile(`${config.pathComponents}/${modelName}/${modelName}Edit.vue`, editTemplate , (err) => {
      if(err){
        console.error(err);
      }else {
        console.log(`${modelName}Edit template was create with success!`);
      }
    });

    const index = new Index(modelName, model, resource);
    const indexTemplate = index.getTemplate();

    fs.writeFile(`${config.pathComponents}/${modelName}/${modelName}Index.vue`, indexTemplate , (err) => {
      if(err){
        console.error(err);
      }else {
        console.log(`${modelName}Index template was create with success!`);
      }
    });

    const view = new View(modelName, model, resource);
    const viewTemplate = view.getTemplate();

    fs.writeFile(`${config.pathComponents}/${modelName}/${modelName}View.vue`, viewTemplate , (err) => {
      if(err){
        console.error(err);
      }else {
        console.log(`${modelName}View template was create with success!`);
      }
    });
}

async function main(){

  if (process.argv.length < 2) {
      console.error("Usage: " + __filename + " path/to/models");
      process.exit(-1);
  }

  config.pathModels = process.argv[2];

  //Adjust params to components folder output
  process.argv.forEach((val, index) => {
    if (val == '-c'){
      if (process.argv[index + 1] == null){
        config.pathComponents = './';
      }else {
        config.pathComponents = process.argv[index + 1];
      }
    }
  });



  let models = await initModels();

  if(process.argv.length >= 3){



    process.argv.forEach((val, index) => {
      if (val == '-r'){
        if (process.argv[index + 1] == null){
          config.path = './';
        }else {
          config.path = process.argv[index + 1];
        }
        createTemplateRouter(models, config);
        createTemplateHome(models);
      }
    });
  }
}

main();
