
        <template>
          <div class="view">
            <div class="breadcrumbs">
              <nav style="display: inline">
                <li><router-link :to="{name: 'home', params:{} }"> Home </router-link></li> /
                <li><router-link :to="{name: 'user', params:{} }"> user </router-link></li>/
                <li><router-link class="breadcrumbs-active" :to="{name: 'userView', params:{id: id} }"> view user </router-link></li>
              </nav>
            </div>
            <div class="row">
                  <div class="card" style="width: 18rem;">
                    <div class="card-header">
                      View user
                    </div>
                      <ul class="list-group list-group-flush">
                       <li v-if="user.name"class="list-group-item"> <strong> name: </strong>{{user.name}}</li> 
 <li v-if="user.birth"class="list-group-item"> <strong> birth: </strong>{{user.birth}}</li> 
 <li v-if="user.picture"class="list-group-item"> <strong> picture: </strong>{{user.picture}}</li> 
 <li v-if="user.gender"class="list-group-item"> <strong> gender: </strong>{{user.gender}}</li> 
 <li v-if="user.message"class="list-group-item"> <strong> message: </strong>{{user.message}}</li> 
 <li v-if="user.preference"class="list-group-item"> <strong> preference: </strong>{{user.preference}}</li> 
 <li v-if="user.partners"class="list-group-item"> <strong> partners: </strong>{{user.partners}}</li> 

                      </ul>
                  </div>
            </div>

            <div class="row">
               <div class="col">
                 <router-link class="btn btn-default" :to="{ name: 'user', params: {} }">BACK TO LIST</router-link>
                 <router-link class="btn btn-warning" :to="{ name: 'userEdit', params: {id: id} }">EDIT</router-link>
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
                user: {}
            }
          },
          methods : {
            setInstace() {
              this.$http.get("http://localhost:3002/users?id="+this.id)
              .then((response) => {
                this.user = response.data[0];
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
        </style>

    