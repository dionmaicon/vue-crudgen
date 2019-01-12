
<template>
  <div class="index container">
    <transition name="fade">
      <router-view />
    </transition>

    <div
      class="breadcrumbs"
      v-if="!modal"
    >
      <nav style="display: inline">
        <li>
          <router-link :to="{name: 'home', params:{} }">
            Home
          </router-link>
        </li> /
        <li>
          <router-link
            class="breadcrumbs-active"
            :to="{name: 'address', params:{} }"
          >
            address
          </router-link>
        </li>
      </nav>
    </div>

    <div
      class="row"
      v-if="!modal"
    >
      <div class="col">
        <router-link
          class="btn btn-primary create-button"
          :to="{ name: 'addressCreate', params: {} }"
        >
          Create <i
            class="fa fa-plus"
            aria-hidden="true"
          />
        </router-link>
      </div>
    </div>

    <div
      class="row"
      v-if="!modal"
    >
      <div
        class="form-group has-search col"
        v-if="!modal"
      >
        <span class="fa fa-search form-control-feedback" />
        <input
          type="text"
          v-model="search"
          class="form-control search"
        >
      </div>
      <div class="col">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">
              Show
            </div>
          </div>
          <select
            v-model="pagination.numberRegisterForPage"
            id="inlineFormInputGroup"
            class="form-control"
          >
            <option
              v-for="n in [5,10,25,50,100]"
              :key="n"
              :value="n"
            >
              {{ n }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div
      class="table-container"
      v-if="!modal"
    >
      <div class="total-pages col">
        <small v-if="mainList.length > 0">
          Total {{ mainList.length }} entryes.
        </small>
        <small v-else>
          Not found entryes or server response.
        </small>
        <small v-if="search != ''">
          Searching term for: "{{ search }}"
        </small>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th @click="sortBy('country')">
              country <i
                style="float: right"
                class="fa fa-sort"
              />
            </th>
            <th @click="sortBy('city')">
              city <i
                style="float: right"
                class="fa fa-sort"
              />
            </th>

            <th>
              <div class="options-th">
                Options
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(address, index) in addressList"
            :key="index"
          >
            <td>{{ address.country }}</td>
            <td>{{ address.city }}</td>

            <td>
              <div class="options-button">
                <button
                  class="btn btn-info"
                  @click="view(address.id)"
                >
                  <i
                    class="fa fa-eye"
                    aria-hidden="true"
                  />
                </button>
                <button
                  class="btn btn-warning"
                  @click="edit(address.id)"
                >
                  <i
                    class="fa fa-pencil"
                    aria-hidden="true"
                  />
                </button>
                <button
                  class="btn btn-danger"
                  @click="remove(address.id)"
                >
                  <i
                    class="fa fa-trash"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button
          type="button"
          class="btn btn-default"
          @click="pagination.current = 0"
          name="button"
        >
          First
        </button>
        <button
          type="button"
          class="btn btn-default"
          @click="pagination.current -= 1 "
          name="button"
        >
          <i class="fa fa-backward" />
        </button>
        <span>Page:<strong> {{ pagination.current + 1 }}  </strong></span>
        <button
          type="button"
          class="btn btn-default"
          @click="pagination.current += 1"
          name="button"
        >
          <i class="fa fa-forward" />
        </button>
        <button
          type="button"
          class="btn btn-default"
          @click="pagination.current = pagination.numberPages"
          name="button"
        >
          Last
        </button>
      </div>
    </div>
  </div>
</template>

    <script>
    import {eventBus} from '../../main.js'
    export default {
      data(){
        return {
          pagination: {
            current: 0,
            numberPages: 0,
            numberRegisterForPage: 5
          },
          addressList: [],
          mainList:[],
          modal: false,
          columns: ["number","street"],
          sort: {
            key: null
          },
          search : ''
        }
      },
      methods: {
        view(id){
          this.modal = !this.modal;
          this.$router.push({ name: 'addressView', params: { id: id }})
        },
        edit(id){
          this.modal = !this.modal;
          this.$router.push({ name: "addressEdit", params: { id: id }})
        },
        remove(){

        },
        getResources () {
          this.$http.get("http://localhost:3002/address").then((response) => {
             this.mainList = response.data;
          })
        },
        sortBy(param){
          if (this.sort.key == param){
            this.mainList.reverse();
            return
          }

          this.mainList.sort((a, b) => {
            if(a[param] < b[param]) return -1;
            if(a[param] > b[param]) return 1;
            return 0;
          });
          this.sort.key = param;
        }
      },
      watch: {
        '$route' (to, from){
          const toDepth = to.path.split('/').length
          const fromDepth = from.path.split('/').length
          this.modal = toDepth < fromDepth ? false : true
        },
        'pagination.current': function(value){
          this.pagination.numberPages = parseInt(this.mainList.length / this.pagination.numberRegisterForPage);
          if(value < 1){
            this.pagination.current = 0;
          }
          if(value > this.pagination.numberPages){
            this.pagination.current = this.pagination.numberPages;
          }
          this.addressList = this.mainList.slice((this.pagination.current * this.pagination.numberRegisterForPage), ((this.pagination.current * this.pagination.numberRegisterForPage) + this.pagination.numberRegisterForPage ));
        },
        'pagination.numberRegisterForPage': function(){
            this.pagination.current = -1;
        },
        'mainList': function(value){
          this.addressList = value.slice((this.pagination.current * this.pagination.numberRegisterForPage), ((this.pagination.current * this.pagination.numberRegisterForPage) + this.pagination.numberRegisterForPage ));
        },
        'search': function( text){
          this.addressList = this.mainList.filter( object => JSON.stringify(object).includes(text))
        }
      },
      created(){
        eventBus.$on('modalHide', () => {
          this.modal = true;
        })

        this.getResources();

        this.addressList = this.mainList.slice(0,10);
        this.pagination.numberPages = parseInt(this.mainList.length / this.pagination.numberRegisterForPage);
      }
    }
    </script>

    <style lang="css" scoped>
    .options-button {
      float: right;
      min-width: 100px;
      width: 100px;
      margin-right: 23px;

    }
    .create-button {
      float: right;
      min-width: 100px;
      width: 130px;
      margin: 8px;
    }
    .options-th {
      float: right;
      width: 80px;
    }
    table tbody tr:hover {
      background-color: #ccc;
    }
    th{
      text-transform: capitalize;
    }
    .table-container {
      overflow-x: auto;
      white-space: nowrap;
    }
    .table-container table {
      width: 100%;
    }
    .total-pages {
      float: right;
    }
    .pagination button {
      margin: 2px;
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
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    .has-search .form-control-feedback {
      position: absolute;
      z-index: 2;
      display: block;
      width: 2.375rem;
      height: 2.375rem;
      line-height: 2.375rem;
      text-align: center;
      pointer-events: none;
      color: #aaa;
    }
    .search {
      padding-left: 2.378rem;
    }

    </style>

    