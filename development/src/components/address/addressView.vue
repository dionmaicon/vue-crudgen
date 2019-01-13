
        <template>
          <div class="view">
            <div class="breadcrumbs">
              <nav style="display: inline">
                <li><router-link :to="{name: 'home', params:{} }"> Home </router-link></li> /
                <li><router-link :to="{name: 'address', params:{} }"> address </router-link></li>/
                <li><router-link class="breadcrumbs-active" :to="{name: 'addressView', params:{id: id} }"> view address </router-link></li>
              </nav>
            </div>
            <div class="row">
                  <div class="card" style="width: 100%;">
                    <div class="card-header">
                      View address
                    </div>
                      <ul class="list-group list-group-flush">
                       <li v-if="address.street"class="list-group-item"> <strong> street: </strong>{{address.street}}</li> 
 <li v-if="address.number"class="list-group-item"> <strong> number: </strong>{{address.number}}</li> 
 <li v-if="address.country"class="list-group-item"> <strong> country: </strong>{{address.country}}</li> 
 <li v-if="address.city"class="list-group-item"> <strong> city: </strong>{{address.city}}</li> 

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
                   Back To List
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
                address: {}
            }
          },
          methods : {
            goBack() {
              this.$router.go(-1);
            },
            edit(id) {
              this.$router.push({ name: "addressEdit", params: { id: id }});
            },
            setInstace() {
              this.$http.get("http://localhost:3002/address/?id="+this.id)
              .then((response) => {
                this.address = response.data[0];
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

    