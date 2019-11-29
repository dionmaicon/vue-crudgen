const App = class {
  constructor() {}
  getTemplate() {
    let template = `
    <template>
      <div id="app" class="container">
        <nav class="navbar sticky-top navbar-dark bg-light" >
          <a  @click="hide = !hide" ><i
            class="fa fa-bars"
          /></a>

        </nav>
        <transition name="fade">
          <menu-component @change="hide = !hide" v-if="hide"></menu-component>
        </transition>
        <router-view v-if="!show"></router-view>
        <footer v-if="!show" >
          <nav class="navbar navbar-light bg-light" style="">
              <div  class="col-12" style="text-align: center">
                <div class="mx-auto ">
                <strong>Nossa localização</strong>
                  <p>Florianopolis</p>
                <details >
                  <p>
                      Desenvolvido por: <a href="http://dionmaicon.github.io">@dionmaicon</a><br>
                      Tel: (54) 99145-1740<br>
                  </p>
                </details>
                2019 TryUs. Software | All Right Reserved
                </div>
              </div>

          </nav>
        </footer>

      </div>
    </template>

    <script type="text/javascript">
    import menu from "./components/menu.vue";
      export default{
        data(){
          return {
            show: false
          }
        },
        components: {
          "menu-component": menu
        }
      }
    </script>

    <style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
    }
    #nav {
      padding: 30px;
    }

    #nav a {
      font-weight: bold;
      color: #2c3e50;
    }

    #nav a.router-link-exact-active {
      color: #42b983;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .8s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    </style>
    `;
    return template;
  }
};

module.exports = App;
