const Menu = class {
  constructor(models) {
    this.models = models;
  }

  getTemplate() {
    let template = `
    <template >
      <div id="nav" class="menuComponent modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div @click="show()" > <router-link to="/">Home</router-link></div>
              routesTemplate
            </div>
          </div>
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
      .modal-mask {
        position: fixed;
        z-index: 9998;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.9);
        display: table;
        transition: opacity .7s ease;
      }
      .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
      }
      .modal-container {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 2px;
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
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
