/* eslint-disable */
const Router = class {
  constructor(models) {
    this.models = models
  }

  getTemplate(){
    let template = `
    import Vue from 'vue'
    import Router from 'vue-router'
    import Home from './components/home.vue'
    importModels

    Vue.use(Router)

    export default new Router({
      // mode: 'history',
      base: process.env.BASE_URL,
      routes: [
        routesModel
        {
          path: '/',
          name: 'home',
          component: Home
        }
      ]
    })

    `;

    let importModels = ``;
    let routesModel = ``;

    for (var i = 0; i < this.models.length; i++) {
      importModels +=
      `
      import ${this.models[i]}View from './components/${this.models[i]}/${this.models[i]}View.vue'
      import ${this.models[i]}Index from './components/${this.models[i]}/${this.models[i]}Index.vue'
      import ${this.models[i]}Edit from './components/${this.models[i]}/${this.models[i]}Edit.vue'
      import ${this.models[i]}Create from './components/${this.models[i]}/${this.models[i]}Create.vue'
      `
      routesModel +=
      `{
        path: '/${this.models[i]}',
        name: '${this.models[i]}',
        component: ${this.models[i]}Index,
        children: [
          { path: 'view/:id', component: ${this.models[i]}View , name: '${this.models[i]}View' },
          { path: 'edit/:id', component: ${this.models[i]}Edit , name: '${this.models[i]}Edit' },
          { path: 'create', component: ${this.models[i]}Create , name: '${this.models[i]}Create'}
        ]
      },
      `;
    }
    template = template.replace(`importModels`, importModels);
    template = template.replace(`routesModel`, routesModel);

    return template;
  }
}
 module.exports = Router;
