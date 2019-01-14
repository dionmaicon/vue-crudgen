
    <template>
      <div class="clientEdit">
        <div class="breadcrumbs">
          <nav style="display: inline">
            <li><router-link :to="{name: 'home', params:{} }"> Home </router-link></li> /
            <li><router-link :to="{name: 'client', params:{} }"> client </router-link></li>/
            <li><router-link class="breadcrumbs-active" :to="{name: 'clientEdit', params:{id: id} }"> edit client </router-link></li>
          </nav>
        </div>
        <h1> Edit client </h1>
        <client-form :id="id"></client-form>
      </div>
    </template>

    <script>
    import clientForm from './clientForm.vue';

    export default {
      name: 'client',
      data () {
        return {
          id: 'Teste'
        }
      },
      components: {
        clientForm
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
    