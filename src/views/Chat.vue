<template>
  <div class="container" id="chat-container">


    <h3>Welcome, {{ authUser.email }}</h3>


    <div
      class="container"
      id="message-container"
      v-for="message in messages"
      :key="message"
    >
      <div
        :class="[
          message.author === authUser.email
            ? 'sent-msg shadow-sm border'
            : 'received-msg shadow-sm border',
        ]"
      >
        <div class="p-4 text-left" id="bubble">
          <div class="time_date text-left">{{ message.author }} </div>
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

    saveMessage() {
      db.collection("chat")
        .add({
          message: this.message,
          author: this.authUser.email,
          postedAt: new Date(),
        })
        .then(() => {
          this.goDown();
        });

      this.message = null;
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
      } else {
        this.authUser = {};
      }
    });
    this.fetchMessages();
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
  max-width: 70%;
  min-width: 40%;
}

.sent-msg {
  background: #b2ffc9;
  color: #222222;
  float: right;
  margin: 10px;
  border-radius: 2rem;
  max-width: 70%;
  min-width: 40%;
}

.time_date {
  color: #333333;
  font-size: 12px;
  font-weight: bold;
  clear: left;
  display: block;
  margin-bottom: 10px;
}

#message-text{
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

/* style determined base on device */
@media (max-width: 550px){
    .sent-msg {
        width: 100%;
    }

    .received-msg{
        width: 100%;
    }

    #chat-container{
      width: 100%;
    }
}
</style>
