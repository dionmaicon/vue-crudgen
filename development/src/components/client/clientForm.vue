<template >
        <div id="clientForm" class="form">
          <form @submit.prevent="handleSubmit">
      	<div class="form-group">
		<label for="id">id</label><br>
	<input id="id" class="form-control"  type="number"  required="false"  primaryKey="true"  autoIncrement="true"  v-model="client.id">

</div>
	<div class="form-group">
		<label for="username">username</label><br>
	<input id="username" class="form-control"  type="text"  required="true"  v-model="client.username">

</div>
	<div class="form-group">
		<label for="touchedAt">touchedAt</label><br>
	<input id="touchedAt" class="form-control"  type="date"  required="true"  v-model="client.touchedAt">

</div>
	<div class="form-group">
		<label for="aNumber">aNumber</label><br>
	<input id="aNumber" class="form-control"  type="number"  required="true"  v-model="client.aNumber">

</div>
	<div class="form-group">
		<label for="bNumber">bNumber</label><br>
	<input id="bNumber" class="form-control"  type="number"  required="true"  v-model="client.bNumber">

</div>
	<div class="form-group">
		<label for="validate">vali"date"Test</label><br>
	<input id="validate" class="form-control"  type="number"  required="true"  v-model="client.validate">

</div>
	<div class="form-group">
		<label for="validateCustom">validateCustom</label><br>
	<input id="validateCustom" class="form-control"  type="text"  required="false"  v-model="client.validateCustom">

</div>
	<div class="form-group">
		<label for="defaultValueBoolean">defaultValueBoolean</label><br>
	<input id="defaultValueBoolean" class="form-control"  type="boolean"  required="true"  defaultValue="1"  v-model="client.defaultValueBoolean">

</div>
	<div class="form-group">
		<label for="createdAt">createdAt</label><br>
	<input id="createdAt" class="form-control"  type="date"  required="false"  v-model="client.createdAt">

</div>
	<div class="form-group">
		<label for="updateAt">updateAt</label><br>
	<input id="updateAt" class="form-control"  type="date"  required="false"  v-model="client.updateAt">

</div>

    <button v-if="id" type="submit"  name="buttonUpdate" class="btn btn-primary " >Update</button>
    <button v-else type="submit"  name="buttonCreate" class="btn btn-success " >Save</button>
    <button  type="button" @click="goBack" name="button" class="btn btn-default" >Back</button>
       </form>
        </div>
      </template>

<script>
  import {eventBus} from '../../main.js';

  export default {
    props: ["id"],
    data () {
      return {
        client: {
          id: '',
username: '',
touchedAt: '',
aNumber: '',
bNumber: '',
validate: '',
validateCustom: '',
defaultValueBoolean: '',
createdAt: '',
updateAt: '',

        }
      }
    },
    created(){
      eventBus.changeModalState();
      this.setInstace();
    },
    methods: {

      async handleSubmit(){
        if(this.id){
          //Implements here your submit method UPDATE
          /**
          * type equals 0 means that this modal disappear automatically after 1500 milliseconds
          * type equals 1 means that this modal  will have button close without timer
          * type equals 2 means that this modal will have button close and ok without timer
          */
          let option = await this.$modal.show({title: "Warning", message: "Do you have sure that want complete this updated?", alert: "warning", type: 2});
          if (option){
            this.$http.put("https://vuejs-resource-tutorial.firebaseio.com/data.json" + this.id, this.client)
            .then( (response) => {
              if (response.status == 200) {
                  this.$modal.show({title: "Success", message: "client was updated with successfull!", alert: "success"});
                  this.goBack();
              }

            }).catch(error => {
              this.$modal.show({title: "Error", message: "Server response with error" + error, alert: "danger", type: 1});
            });
          }
          return
        }else {
          //Implements here your submit method CREATE
          let option = await this.$modal.show({title: "Warning", message: "Do you want to continue?", alert: "warning", type: 2});
          if (option){
            this.$http.post("https://vuejs-resource-tutorial.firebaseio.com/data.json", this.client)
            .then( (response) => {
                if(response.status == 201){
                  this.$modal.show({title: "Success", message: "client was created with successfull!", alert: "success"});
                  this.goBack();
                }
            }).catch(error => {
              this.$modal.show({title: "Error", message: "Server response with error" + error, alert: "danger", type: 1});
            })
          }

        }
      },
      goBack(){
        this.$router.go(-1);
      },
      setInstace(){
        if(this.id){
          this.$http.get("https://vuejs-resource-tutorial.firebaseio.com/data.json" + this.id)
            .then(response => {
              let instance = response.data;
              for (var prop in instance) {
                if (instance.hasOwnProperty(prop) && this.client.hasOwnProperty(prop)) {
                  this.client[prop] = instance[prop];
                }
              }
            })
        }
      }
    }
  }
</script>
<style lang="css" scoped>
  label {
    text-transform: capitalize;
  }
  button {
    margin: 8px;
    width: 30%;
    float: right;
  }
  form {
    overflow: hidden;
  }
</style>
