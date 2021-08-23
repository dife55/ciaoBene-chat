<template>


  <div class="container-fluid">
    <input
      @keyup.enter="saveMessage"
      v-model="message"
      type="text"
      class="form-control"
      placeholder="Type a message"
    />
    <button class="btn btn-primary" type="button">SEND</button>
  </div>
</template>

<script>
export default {
  name: "Chat",

  data() {
    return {
      message: null,
      messages: [],
    };
  },

  methods: {
    saveMessage() {
      db.collection("chat").add({
        message: this.message,
      });

      this.message = null;
    },

    fetchMessages() {
      db.collection("chat")
        .get()
        .then((querySnapshot) => {
          let allMessages = [];
          querySnapshot.forEach((doc) => {
            allMessages.push(doc.data());
          });

          this.messages = allMessages;
        });
    },
  },

  created() {
    this.fetchMessages();
  },
};
</script>

<style scoped>

</style>
