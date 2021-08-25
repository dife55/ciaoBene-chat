<template>
  <div class="container">

  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          v-model="formData.email"
          class="form-control"
          placeholder="email"
        />
  </div>

  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          v-model="formData.password"
          class="form-control"
          placeholder="password"
        />

    <div class="password-hint-error" id="password-hint">Password must contain at least 6 characters</div>
  </div>
  <div class="d-grid gap-2">

        <button class="btn btn-success" @click="signIn">Signin</button>
          <button class="btn btn-success" @click="login">Login with Google</button>
  </div>
  </div>

</template>

<script>
import firebase from "firebase";
export default {
  name: "SignIn",
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.formData.email, this.formData.password)
        .then((user) => {
          this.$router.replace("/");
        })
        .catch((e) => {
          alert(e.message);
        });
    },

    login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;

          this.$router.push('/')
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
  },
  created() {},
};
</script>

<style>
</style>
