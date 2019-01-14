
        <template>
          <div class="view">
            <div class="breadcrumbs">
              <nav style="display: inline">
                <li><router-link :to="{name: 'home', params:{} }"> Home </router-link></li> /
                <li><router-link :to="{name: 'client', params:{} }"> client </router-link></li>/
                <li><router-link class="breadcrumbs-active" :to="{name: 'clientView', params:{id: id} }"> view client </router-link></li>
              </nav>
            </div>
            <div class="row">
                  <div class="card" style="width: 100%;">
                    <div class="card-header">
                      View client
                    </div>
                      <ul class="list-group list-group-flush">
                       <li v-if="client.id"class="list-group-item"> <strong> id: </strong>{{client.id}}</li> 
 <li v-if="client.username"class="list-group-item"> <strong> username: </strong>{{client.username}}</li> 
 <li v-if="client.touchedAt"class="list-group-item"> <strong> touchedAt: </strong>{{client.touchedAt}}</li> 
 <li v-if="client.aNumber"class="list-group-item"> <strong> aNumber: </strong>{{client.aNumber}}</li> 
 <li v-if="client.bNumber"class="list-group-item"> <strong> bNumber: </strong>{{client.bNumber}}</li> 
 <li v-if="client.vali"date"Test"class="list-group-item"> <strong> vali"date"Test: </strong>{{client.vali"date"Test}}</li> 
 <li v-if="client.validateCustom"class="list-group-item"> <strong> validateCustom: </strong>{{client.validateCustom}}</li> 
 <li v-if="client.defaultValueBoolean"class="list-group-item"> <strong> defaultValueBoolean: </strong>{{client.defaultValueBoolean}}</li> 
 <li v-if="client.createdAt"class="list-group-item"> <strong> createdAt: </strong>{{client.createdAt}}</li> 
 <li v-if="client.updateAt"class="list-group-item"> <strong> updateAt: </strong>{{client.updateAt}}</li> 

                      </ul>
                  </div>
            </div>

            <div class="row">
               <div class="col">
                 <button
                   @click="edit(id)"
                   class="btn btn-warning "
                 >
                   Edit
                 </button>
                 <button
                   type="button"
                   @click="goBack()"
                   name="button"
                   class="btn btn-default"
                 >
                   Back
                 </button>
               </div>
            </div>
          </div>

        </template>

        <script>
        import {eventBus} from '../../main.js';
        export default {
          data(){
            return{
                id: '',
                client: {}
            }
          },
          methods : {
            goBack() {
              this.$router.go(-1);
            },
            edit(id) {
              this.$router.push({ name: "clientEdit", params: { id: id }});
            },
            setInstace() {
              this.$http.get("https://vuejs-resource-tutorial.firebaseio.com/data.json?id="+this.id)
              .then((response) => {
                this.client = response.data[0];
              })
            }
          },
          created() {
            this.id = this.$route.params.id;
            eventBus.changeModalState();
            this.setInstace();
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
        button {
          margin: 8px;
          width: 30%;
          float: right;
        }
        </style>

    