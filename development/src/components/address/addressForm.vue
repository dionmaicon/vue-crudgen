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
    props: ['id'],
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
      
      handleSubmit(){
        if(this.id){
          console.log("Implements here your submit method UPDATE");
        }else {
          console.log("Implements here your submit method CREATE");
        }
      },
      goBack(){
        this.$router.go(-1);
      },
      setInstace(){
        if(this.id){
          this.$http.get("http://localhost:3002/address?id="+this.id)
            .then(response => {
              let instance = response.data[0];
              for (var prop in instance) {
                if (instance.hasOwnProperty(prop) && this.address.hasOwnProperty(prop)) {
                  // if (prop == 'gender'){
                  //     this.address[prop].selected = instance[prop];
                  //     continue;
                  // }
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

