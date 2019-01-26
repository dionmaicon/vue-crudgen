/* eslint-disable */
const Index = class {
  constructor(name, model, resource){
    this.modelName = name;
    this.model = model;
    this.resource = resource;
  }

  getTemplate(){
    let templateStrucTableHead = ``;
    let templateStrucTableBody = ``;

    let templateHTMLBegin =
    `
    <template>
      <div class="index container">

      <transition name="fade">
        <router-view>
        </router-view>
      </transition>

      <div class="breadcrumbs" v-if="!modal">
        <nav style="display: inline">
          <li><router-link :to="{name: 'home', params:{} }"> Home </router-link></li> /
          <li><router-link class="breadcrumbs-active" :to="{name: '${this.modelName}', params:{} }"> ${this.modelName} </router-link></li>
        </nav>
      </div>

      <div class="row" v-if="!modal">
        <div class="col">
          <router-link class="btn btn-primary create-button" :to="{ name: '${this.modelName}Create', params: {} }">Create <i class="fa fa-plus" aria-hidden="true"></i></router-link>
        </div>
      </div>

      <div class="row" v-if="!modal">
        <div class="form-group has-search col" v-if="!modal">
            <span class="fa fa-search form-control-feedback"></span>
            <input type="text" v-model="search" class="form-control search">
        </div>
        <div class="col">
          <div  class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">Show</div>
            </div>
              <select v-model="pagination.numberRegisterForPage" id="inlineFormInputGroup" class="form-control" >
                <option v-for="n in [5,10,25,50,100]" :key="n" v-bind:value="n">
                  {{n}}
                </option>
              </select>
          </div>
        </div>

      </div>

      <div class="table-container" v-if="!modal">
        <div class="total-pages col">
        <small v-if="mainList.length > 0">Total {{mainList.length}} entryes.</small>
        <small v-else >Not found entryes or server response.</small>
        <small v-if="search != ''"> Searching term for: "{{search}}"</small>
        </div>
        <table class="table table-striped" >
          <thead>
            <tr>
                templateStrucTableHead
                <th>
                  <div class="options-th">
                    Options
                  </div>
                </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(${this.modelName}, index) in ${this.modelName}List" :key="index">
              templateStrucTableBody
            </tr>
          </tbody>
        </table>
        </div>
        <div class="pagination">
            <button type="button" class="btn btn-default" @click="pagination.current = 0" name="button">First</button>
            <button type="button" class="btn btn-default" @click="pagination.current -= 1 " name="button"><i class="fa fa-backward"></i></button>
            <span>Page:<strong> {{pagination.current + 1}}  </strong></span>
            <button type="button" class="btn btn-default" @click="pagination.current += 1" name="button"><i class="fa fa-forward"></i></button>
            <button type="button" class="btn btn-default" @click="pagination.current = pagination.numberPages" name="button">Last</button>
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
          ${this.modelName}List: [],
          mainList:[],
          modal: false,
          columns: hide_columns,
          sort: {
            key: null
          },
          search : ''
        }
      },
      methods: {
        view(id){
          this.modal = !this.modal;
          this.$router.push({ name: '${this.modelName}View', params: { id: id }})
        },
        edit(id){
          this.modal = !this.modal;
          this.$router.push({ name: "${this.modelName}Edit", params: { id: id }})
        },
        async remove(id){
          let option = await this.$modal.show({title: "Danger", message: "Do you sure that want delete this ${this.modelName}? This operation is irreversible!" , alert : "danger"});
          if(option){
            this.$http.delete("${this.resource.endPoint}" + id)
              .then( response => {
                this.$modal.show({title: "Success", message: "${ this.modelName} was deleted with successfull!", alert: "info"});
                this.getResources();
              }).catch(err => {
                  this.$modal.show({title: "Error", message: "Server response with error" + error, alert: "danger", type: 1});
              });
          }
        },
        getResources () {
          this.$http.get("${this.resource.endPoint}").then((response) => {
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
          if(!this.modal){
            this.getResources();
          }
        },
        'pagination.current': function(value){
          this.pagination.numberPages = parseInt(this.mainList.length / this.pagination.numberRegisterForPage);
          if(value < 1){
            this.pagination.current = 0;
          }
          if(value > this.pagination.numberPages){
            this.pagination.current = this.pagination.numberPages;
          }
          this.${this.modelName}List = this.mainList.slice((this.pagination.current * this.pagination.numberRegisterForPage), ((this.pagination.current * this.pagination.numberRegisterForPage) + this.pagination.numberRegisterForPage ));
        },
        'pagination.numberRegisterForPage': function(){
            this.pagination.current = -1;
        },
        'mainList': function(value){
          this.${this.modelName}List = value.slice((this.pagination.current * this.pagination.numberRegisterForPage), ((this.pagination.current * this.pagination.numberRegisterForPage) + this.pagination.numberRegisterForPage ));
        },
        'search': function( text){
          this.${this.modelName}List = this.mainList.filter( object => JSON.stringify(object).includes(text))
        }
      },
      created(){
        eventBus.$on('modalHide', () => {
          this.modal = true;
        })

        this.getResources();

        this.${this.modelName}List = this.mainList.slice(0,10);
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
    .pagination {
      vertical-align: center;
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
      background-color: white;
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

    `;

    let hide = this.model['hide'];

    if(hide != null){
        templateHTMLBegin = templateHTMLBegin.replace('hide_columns', JSON.stringify(this.model['hide']));
    }else{
        templateHTMLBegin = templateHTMLBegin.replace('hide_columns', '[]');
    }

    for (var property in this.model) {
      if (this.model.hasOwnProperty(property)) {
        let prefix;
        if (property.includes('_')) {
          prefix = property.split("_")[0];
        }else {
          prefix = property;
        }

        if(hide){
            if(hide.includes(prefix)) continue;
            if(property.includes('hide')) continue;
        }

        templateStrucTableHead += `<th @click="sortBy('${prefix}')"> ${prefix} <i style="float: right" class="fa fa-sort"> </i></th>\n`;
        templateStrucTableBody += `<td>{{${this.modelName}.${prefix}}}</td>\n`;
      }
    }

    templateStrucTableBody +=
    `
    <td>

      <div class="options-button">
        <button  class="btn btn-info" @click="view(${this.modelName}.id)" ><i class="fa fa-eye" aria-hidden="true"></i></button>
        <button  class="btn btn-warning" @click="edit(${this.modelName}.id)" ><i class="fa fa-pencil" aria-hidden="true"></i></button>
        <button  class="btn btn-danger" @click="remove(${this.modelName}.id)"><i class="fa fa-trash" aria-hidden="true"></i></button>
      </div>
    </td>
    `;

    templateHTMLBegin = templateHTMLBegin.replace('templateStrucTableHead', templateStrucTableHead);
    templateHTMLBegin = templateHTMLBegin.replace('templateStrucTableBody', templateStrucTableBody);

    return templateHTMLBegin;
  }
}

module.exports = Index;
