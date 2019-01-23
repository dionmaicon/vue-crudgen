const Menu = class {
  constructor(models) {
    this.models = models;
  }

  getTemplate() {
    let template = `
    <template >
      <div id="nav" class="container">
        <div @click="show()" > <router-link to="/">Home</router-link></div>
          routesTemplate
        <div style="min-height: 300px" @click="$emit('change')">
        </div>
      </div>
    </template>

    <script>
    export default {
      data(){
        return {
        }
      },
      methods:{
        show(){
          this.$emit('change')
        }
      }
    }
    </script>

    <style lang="css" scoped>
      #nav {
        text-transform: capitalize;
        display: block;
      }
    </style>
    `;
    let routesTemplate = ``;
    for (var i = 0; i < this.models.length; i++) {
      routesTemplate += `<div @click="show()" ><router-link to="/${this.models[i]}">${
        this.models[i]
      }</router-link></div>\n`;
    }

    template = template.replace(`routesTemplate`, routesTemplate);
    return template;
  }
};

module.exports = Menu;
