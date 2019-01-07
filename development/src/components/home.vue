
    <template >
      <div class="home container">
        <h1>Vue.js CRUD Generator</h1>
        <h1>by Dion Maicon E. Duarte</h1>
        <button type="button" @click="show = !show"> Show routes</button>
        <div id="nav" v-if="show">
          <div> <router-link to="/">Home</router-link></div>
          <div><router-link to="/address">User</router-link></div>
          <div><router-link to="/user">User</router-link></div>


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
