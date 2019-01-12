
<template>
  <div class="addressEdit">
    <div class="breadcrumbs">
      <nav style="display: inline">
        <li>
          <router-link :to="{name: 'home', params:{} }">
            Home
          </router-link>
        </li> /
        <li>
          <router-link :to="{name: 'address', params:{} }">
            address
          </router-link>
        </li>/
        <li>
          <router-link
            class="breadcrumbs-active"
            :to="{name: 'addressEdit', params:{id: id} }"
          >
            edit address
          </router-link>
        </li>
      </nav>
    </div>
    <h1> Edit address </h1>
    <address-form :id="id" />
  </div>
</template>

    <script>
    import addressForm from './addressForm.vue';

    export default {
      name: 'Address',
      data () {
        return {
          id: 'Teste'
        }
      },
      components: {
        addressForm
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
    