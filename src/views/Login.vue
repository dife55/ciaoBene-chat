<template>
  <div class="container">
    <h3>Login</h3>
          <div class="row">
        <h2>Signin</h2>

        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-md-offset-3">

            <input type="email" v-model="formData.email" class="form-control" placeholder="email">
            <br>
            <input type="password" v-model="formData.password" class="form-control" placeholder="password">
            <br>
            <button class="btn btn-success" @click="signIn">Signin</button>
        </div>

    </div>


    <button @click="login">Google Login</button>
  </div>
</template>

<script>
import firebase from "firebase";
    export default {
        name: 'SignIn',
        data () {
            return {
                formData:{
                    email:'',
                    password:''
                }
            }
        },
        methods: {
            signIn(){
                firebase.auth().signInWithEmailAndPassword(this.formData.email,this.formData.password)
                    .then((user)=>{
                      this.$router.replace('/')
                    })
                    .catch((e)=>{
                        alert(e.message)
                    })
            }
        },
        created(){
        }
    }
</script>

<style>
</style>
