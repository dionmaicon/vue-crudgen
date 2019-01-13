/* eslint-disable */
const View = class {
  constructor(name, model, resource){
    this.modelName = name;
    this.model = model;
    this.resource = resource;
  }

  getTemplate(){
    let template =
    `
        <template>
          <div class="view">
            <div class="breadcrumbs">
              <nav style="display: inline">
                <li><router-link :to="{name: 'home', params:{} }"> Home </router-link></li> /
                <li><router-link :to="{name: '${this.modelName}', params:{} }"> ${this.modelName} </router-link></li>/
                <li><router-link class="breadcrumbs-active" :to="{name: '${this.modelName}View', params:{id: id} }"> view ${this.modelName} </router-link></li>
              </nav>
            </div>
            <div class="row">
                  <div class="card" style="width: 100%;">
                    <div class="card-header">
                      View ${this.modelName}
                    </div>
                      <ul class="list-group list-group-flush">
                      viewStruct
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
                ${this.modelName}: {}
            }
          },
          methods : {
            goBack() {
              this.$router.go(-1);
            },
            edit(id) {
              this.$router.push({ name: "${this.modelName}Edit", params: { id: id }});
            },
            setInstace() {
              this.$http.get("${this.resource.endPoint}?id="+this.id)
              .then((response) => {
                this.${this.modelName} = response.data[0];
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

    `;
    let viewStruct = '';
    for (var property in this.model) {
      if (this.model.hasOwnProperty(property)) {
        let prefix;
        if (property.includes('_')) {
          prefix = property.split("_")[0];
        }else {
          prefix = property;
        }

        if(property.includes('hide')) continue;

        if(property.includes('select')) {
            viewStruct += ` <li v-if="${this.modelName}.${prefix}" class="list-group-item"> <strong> ${prefix}: </strong>{{${this.modelName}.${prefix}.selected}}</li> \n`;
            continue;
        }

        viewStruct += ` <li v-if="${this.modelName}.${prefix}"class="list-group-item"> <strong> ${prefix}: </strong>{{${this.modelName}.${prefix}}}</li> \n`;

      }
    }
    template = template.replace(`viewStruct`, viewStruct);
    return template;
  }
}

module.exports = View;
