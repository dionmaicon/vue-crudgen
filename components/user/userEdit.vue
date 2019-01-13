
    <template>
      <div class="userEdit">
        <div class="breadcrumbs">
          <nav style="display: inline">
            <li><router-link :to="{name: 'home', params:{} }"> Home </router-link></li> /
            <li><router-link :to="{name: 'user', params:{} }"> user </router-link></li>/
            <li><router-link class="breadcrumbs-active" :to="{name: 'userEdit', params:{id: id} }"> edit user </router-link></li>
          </nav>
        </div>
        <h1> Edit user </h1>
        <user-form :id="id"></user-form>
      </div>
    </template>

    <script>
    import userForm from './userForm.vue';

    export default {
      name: 'user',
      data () {
        return {
          id: 'Teste'
        }
      },
      components: {
        userForm
      },
      created () {
          this.id = this.$route.params.id;
      }
    }
    </script>

    <style lang="css" scoped>
    h1 {
      text-transform: capitalize;
      text-align: center;
    }
    li {
      display: inline;
      text-transform: capitalize;
      font-size: 0.8em;
    }
    .breadcrumbs {
      background-color: #F1F1F1;
    }
    .breadcrumbs-active {
      text-decoration: underline;
      color: black;
      font-weight: bold;
    }
    </style>
    