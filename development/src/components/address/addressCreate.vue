
<template>
  <div class="addressCreate">
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
            :to="{name: 'addressCreate', params:{} }"
          >
            create address
          </router-link>
        </li>
      </nav>
    </div>
    <h1> Create address </h1>
    <address-form />
  </div>
</template>

    <script>
    import addressForm from './addressForm.vue';

    export default {
      name: 'Address',
      components: {
        addressForm
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
    