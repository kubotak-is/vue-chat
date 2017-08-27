<template>
  <section id="input-container">
    <div class="input-item_1">
      <input class="msg-input"
        type="text" 
        placeholder="input message..." 
        maxlength="140" 
        v-model="message" 
        v-on:keydown.enter="send"/>
    </div>
    <div class="input-item_2">
      <a class="btn-send" 
      v-bind:class="{'disable': message.length === 0}" 
      @click="send">
        <i class="fa fa-paper-plane" aria-hidden="true"></i>
      </a>
    </div>
  </section>
</template>

<style lang="scss">
  #input-container {
    display: grid;
    grid-template-rows: 50px;
    grid-template-columns: 1fr 50px;

    &> .input-item_1{
      grid-row: 1;
      grid-column: 1;
    }

    &> .input-item_2{
      grid-row: 1;
      grid-column: 2;
    }
  }
  .msg-input {
    width: 100%;
    height: 50px;
    padding: 0 15px;
    border: none;
  }
  .btn-send {
    width: 50px;
    height: 50px;
    color: #FFF;
    background: #2196F3;
    display: block;
    font-size: 24px;
    text-align: center;
    padding: 9px 0 0;

    &.disable {
      background: #90CAF9;
    }

    &:hover {
      background: #1976D2;
    }
  }
</style>

<script>
import timestamp from "../util/timestamp"

export default {
  data: function() {
    return {
      message: ""
    }
  },
  created: function() {
    this.user = this.$parent.user;
    this.fb   = this.$root.fb;
  },
  methods: {
    send: function(e) {
      // validation
      if (this.message.length === 0) return;

      // save
      let createdAt = timestamp();
      let chatKey = this.$parent.chatRef.key;
      
      let ref = this.fb.database().ref('messages').push();
      ref.set({
        chatKey: chatKey,
        message: this.message,
        userId: this.user.uid,
        userName: this.user.displayName,
        userAvater: this.user.photoURL,
        createdAt: createdAt,
        createdAtReserve: -createdAt
      });

      // reset
      this.message = "";
    }
  }
}
</script>