import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import firebase from 'firebase'




// Required for side-effects
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyAdsGSig2iThXL8tgax23QEC5IzGvw7Zos",
    authDomain: "ciao-bene-chat.firebaseapp.com",
    projectId: "ciao-bene-chat",
    storageBucket: "ciao-bene-chat.appspot.com",
    messagingSenderId: "685530573170",
    appId: "1:685530573170:web:b494109b23fd5d01a9d5eb",
    measurementId: "G-Q5CC08W7FE"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
window.db = db;

createApp(App).use(store).use(router).mount('#app')
