<template >
        <div id="addressForm" class="form">
          <form @submit.prevent="handleSubmit">
      	<div class="form-group">
		<label for="street">street</label><br>
	<input id="street" class="form-control"  value=""  type="text"  required="true"  v-model="address.street">

</div>
	<div class="form-group">
		<label for="number">number</label><br>
	<input id="number" class="form-control"  type="text"  required="true"  v-model="address.number">

</div>
	<div class="form-group">
		<label for="country">country</label><br>
	<input id="country" class="form-control"  type="text"  required="true"  v-model="address.country">

</div>
	<div class="form-group">
		<label for="city">city</label><br>
	<input id="city" class="form-control"  type="text"  required="true"  v-model="address.city">

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
        address: {
          street: '',
number: '',
country: '',
city: '',

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
            this.$http.put("undefined" + this.id, this.undefined)
            .then( (response) => {
              if (response.status == 200) {
                  this.$modal.show({title: "Success", message: "address was updated with successfull!", alert: "success"});
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
            this.$http.post("http://localhost:3002/address", this.undefined)
            .then( (response) => {
                if(response.status == 201){
                  this.$modal.show({title: "Success", message: "address was created with successfull!", alert: "success"});
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
          this.$http.get("http://localhost:3002/address"+this.id)
            .then(response => {
              let instance = response.data;
              for (var prop in instance) {
                if (instance.hasOwnProperty(prop) && this.address.hasOwnProperty(prop)) {
                  this.address[prop] = instance[prop];
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

