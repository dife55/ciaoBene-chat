<template>
  <div class="container">
<form>

  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" v-model="formData.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
  </div>

  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" minlength="6" v-model="formData.password" class="form-control" id="exampleInputPassword1" aria-describedby="password-hint" placeholder="Password">
    <div class="password-hint-error" id="password-hint">Password must contain at least 6 characters</div>
  </div>
  <div class="d-grid gap-2">
  <button class="btn btn-success" @click="signUp">SignUp</button>
  <button class="btn btn-success" @click="login">I have a google account</button>
  </div>
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
          this.$router.push('Login')
          // Signed in
          // var user = userCredential.user;
          // ...
          username = this.formData.username;
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
