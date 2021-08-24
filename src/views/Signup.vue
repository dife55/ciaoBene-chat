<template>
  <div class="container">
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" v-model="formData.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" v-model="formData.password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>

  <button class="btn btn-success" @click="signUp">SignUp</button>
</form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Signup",
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.formData.email, this.formData.password)
        .then((user) => {

          this.$router.replace('/login')

          // Signed in
          // var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    },
  },
};
</script>

<style>
</style>
