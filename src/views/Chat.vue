<template>
<head>
  
</head>
  <div class="container mt-5" id="chat-container">
    <h3>Ciao bene, {{ authUser.email }}</h3>
    <button class="btn btn-danger mt-3 mb-5" @click="deleteUser">Delete User</button>
    <button class="btn btn-dark mt-3 mb-5" @click="logOut">Log Out</button>


    <div
      class="container"
      id="message-container"
      v-for="message in messages"
      :key="message"
    >
      <div
        :class="[
          message.author == authUser.email
            ? 'sent-msg shadow-sm border'
            : 'received-msg shadow-sm border',
        ]"
      >
        <div class="p-4 text-left" id="bubble">
          <div class="" id="username-div">{{ message.author }}</div>
          <p class="text-start" id="message-text">{{ message.message }}</p>
        </div>
      </div>
    </div>

    <input
      @keyup.enter="saveMessage"
      v-model="message"
      type="text"
      class="form-control rounded-pill shadow-sm border mb-5"
      id="write-message"
      placeholder="Type a message"
    />
  </div>

  <div class="bottom-div"></div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Chat",

  data() {
    return {
      message: null,
      messages: [],
      authUser: {},
    };
  },

  methods: {
    goDown() {
      let box = document.querySelector(".bottom-div");
      box.scrollTop = box.scrollHeight;
    },

    deleteUser() {
      const user = firebase.auth().currentUser;

      user
        .delete()
        .then(() => {
          // User deleted.
        })
        .catch((error) => {
          // An error ocurred
          // ...
        });
    },

    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    },

    saveMessage() {
      let username = this.authUser.email.split('@')[0];
      db.collection("chat")
        .add({
          message: this.message,
          author: this.authUser.email,
          username: username,
          postedAt: new Date(),
        })
        .then(() => {
          this.goDown();
        });

      this.message = null;

      return username;
    },

    fetchMessages() {
      db.collection("chat")
        .orderBy("postedAt")
        .onSnapshot((querySnapshot) => {
          let allMessages = [];
          querySnapshot.forEach((doc) => {
            allMessages.push(doc.data());
          });

          this.messages = allMessages;

          setTimeout(() => {
            this.goDown();
          }, 1000);
        });
    },
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authUser = user;
        let name = user.email.split('@')[0];
      } else {
        this.authUser = {};
      }
    });
    this.fetchMessages();

    return name
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          next();

        } else {
          vm.$router.push("/login");
        }
      });
    });
  },
};
</script>

<style scoped>
.received-msg {
  background: rgb(255, 255, 255);
  float: left;
  margin: 10px;
  border-radius: 2rem;
  max-width: 80%;
  min-width: 80%;
}

.sent-msg {
  background: #FE4C6F;
  color: #ffffff;
  float: right;
  margin: 10px;
  border-radius: 2rem;
  max-width: 80%;
  min-width: 80%;
}

#username-div {
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  clear: left;
  display: block;
  margin-bottom: 10px;
}

#message-text {
  font-size: 0.8rem;
}

#write-message {
  padding: 15px;
  display: inline-block;
}

#chat-container {
  width: 40%;
}

#message-container {
  text-align: left;
  display: inline-block;
}

/* style determined based on device */
@media (max-width: 550px) {
  .sent-msg {
    width: 100%;
  }

  .received-msg {
    width: 100%;
  }

  #chat-container {
    width: 100%;
  }
}
</style>
