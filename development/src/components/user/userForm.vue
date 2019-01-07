<template >
        <div id="userForm" class="form">
          <form @submit.prevent="handleSubmit">
      	<div class="form-group">
		<label for="name">name</label><br>
	<input id="name" class="form-control"  value=""  required="true"  type="text"  v-model="user.name">

</div>
	<div class="form-group">
		<label for="birth">birth</label><br>
	<input id="birth" class="form-control"  value=""  required="true"  type="date"  v-model="user.birth">

</div>
	<div class="form-group">
		<label for="picture">picture</label><br>
	<input type="file" id="picture"  v-on:change="pictureOnFileChange">
</div>
	<div class="form-group">
		<label for="gender">gender</label><br>
<div class="col-12">
	<select id="gender" v-model="user.gender.selected" class="form-control" >
		<option v-for="option in user.gender.options" v-bind:value="option.value"> 
			{{option.text}}
		</option>
	</select>
</div>
</div>
	<div class="form-group">
		<label for="message">message</label><br>
	<textarea id="message" style="width: 100%" v-model="user.message" rows="10">You text here...</textarea>

</div>
	<div class="form-group">
		<label for="preference">preference</label><br>
	<input type="radio" id="one" value="One" v-model="user.preference">
	<label for="one">One</label><br>

	<input type="radio" id="two" value="Two" v-model="user.preference">
	<label for="two">Two</label><br>

	<input type="radio" id="three" value="Three" v-model="user.preference">
	<label for="three">Three</label><br>

</div>
	<div class="form-group">
		<label for="partners">partners</label><br>
	<input type="checkbox" id="tryus" value="TryUs. Software" v-model="user.partners">
	<label for="tryus">TryUs. Software</label><br>

	<input type="checkbox" id="twitter" value="Twitter" v-model="user.partners">
	<label for="twitter">Twitter</label><br>

	<input type="checkbox" id="google" value="Google" v-model="user.partners">
	<label for="google">Google</label><br>

	<input type="checkbox" id="vuemastery" value="Vue Mastery" v-model="user.partners">
	<label for="vuemastery">Vue Mastery</label><br>

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
        user: {
          name: '',
birth: '',
picture_file: '',
gender: {"options":[{"text":"Men","value":"M"},{"text":"Woman","value":"W"}]},
message: '',
preference: '',
partners: [],

        }
      }
    },
    created(){
      eventBus.changeModalState();
      this.setInstace();
    },
    methods: {
      
              pictureOnFileChange(e){
                let files = e.target.files || e.dataTransfer.files;
                if(files.length){
                  this.user.picture = files[0];
                }
              },
              
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
          this.$http.get("http://localhost:3002/users?id="+this.id)
            .then(response => {
              let instance = response.data[0];
              for (var prop in instance) {
                if (instance.hasOwnProperty(prop) && this.user.hasOwnProperty(prop)) {
                  // if (prop == 'gender'){
                  //     this.user[prop].selected = instance[prop];
                  //     continue;
                  // }
                  this.user[prop] = instance[prop];
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

