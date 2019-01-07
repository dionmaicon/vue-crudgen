const Home = class {
  constructor(models) {
    this.models = models;
  }

  getTemplate(){
    let template = `
    <template >
      <div class="home container">
        <h1>Vue.js CRUD Generator</h1>
        <h1>by Dion Maicon E. Duarte</h1>
        <button type="button" @click="show = !show"> Show routes</button>
        <div id="nav" v-if="show">
          <div> <router-link to="/">Home</router-link></div>
          routesTemplate

        </div>
      </div>
    </template>

    <script>
    export default {
      data(){
        return {
          show:  true
        }
      }
    }
    </script>

    <style lang="css" scoped>

    </style>
    `;
    let routesTemplate = ``;
    for (var i = 0; i < this.models.length; i++) {
      routesTemplate += `<div><router-link to="/${this.models[i]}">${this.models[i]}</router-link></div>\n`;
    }

    template = template.replace(`routesTemplate`, routesTemplate);
    return template;
  }
}

module.exports = Home;
