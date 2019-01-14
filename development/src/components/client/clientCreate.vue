
    <template>
      <div class="clientCreate">
      <div class="breadcrumbs">
        <nav style="display: inline">
          <li><router-link :to="{name: 'home', params:{} }"> Home </router-link></li> /
          <li><router-link :to="{name: 'client', params:{} }"> client </router-link></li>/
          <li><router-link class="breadcrumbs-active" :to="{name: 'clientCreate', params:{} }"> create client </router-link></li>
        </nav>

      </div>
        <h1> Create client </h1>
        <client-form></client-form>
      </div>
    </template>

    <script>
    import clientForm from './clientForm.vue';

    export default {
      name: 'client',
      components: {
        clientForm
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
    