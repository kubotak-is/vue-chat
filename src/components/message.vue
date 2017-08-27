<template>
  <section id="messages">
    <ul>
      <li v-for="message in messageList">
        <div class="message-wrapper"
          v-bind:class="{'ismine': isMineMsg(message)}">
          <div class="message-box">
            
            <div class="message-item_user">
              <span class="user">{{ message.userName }}</span>
            </div>
            
            <div class="inner">
              
              <div class="message-item_avater">
                <img class="avater" v-bind:src="message.userAvater"/>
              </div>
              
              <div class="message-item_detail">
                <p class="detail">{{ message.message }}</p>
                <span class="time">{{ getTime(message.createdAt) }}</span>
              </div>

            </div>
          
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
  #messages ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .message-wrapper {
    display: flex;
    flex-direction: row;

    .message-box {
      width: 100%;
      padding: 5px 10px;
    }

    .inner {
      display: flex;
      flex-direction: row;
    }

    /** 他人レイアウト */
    .message-item_user {
      margin: 0 0 5px;
    }

    .message-item_avater {
      width: 30px;
      height: 30px;
      margin: 0 10px 0 0;
    }

    .message-item_detail {
      max-width: 60%;
      height: auto;
    }

    .user {
      font-size: 12px;
    }

    .avater {
      width: 30px;
      height: 30px;
      border-radius: 30px;
    }

    .detail {
      border-radius: 30px;
      background: #FFF;
      padding: 5px 10px;
      margin: 0;
      box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.4);
    }

    .time {
      color: #FFF;
      font-size: 10px;
      margin: 10px 0 0;
    }

    /** 自分レイアウト */
    &.ismine {
      flex-direction: row-reverse;

      .inner {
        flex-direction: row-reverse;
      }

      .message-item_user {
        display: none;
      }

      .message-item_avater {
        display: none;
      }

      .message-item_detail {
      }

      .detail {
        background: #85E046;
      }
    }

    
  }
</style>

<script>
import anime from 'animejs'
import timestamp from '../util/timestamp'
import displaytime from '../util/displaytime'

export default {
  data: function() {
    return {
      messageList: []
    }
  },
  created: function() {
    this.fb = this.$root.fb;
    this.initChat();
    this.loadMsg();
  },
  methods: {
    initChat: function() {
      let ref = this.fb.database().ref('chats');
      let hash = location.hash;

      if (hash !== null && hash.length > 0) {

        // has current chat
        let chatId = hash.slice(1);
        this.chatRef = ref.child(chatId);
        this.$parent.chatRef = this.chatRef;

      } else {

        // new create chat
        this.chatRef = ref.push();

        let createdAt = timestamp();
        // save
        this.chatRef.set({
          createdAt: createdAt,
          createAtReserve: -createdAt
        })
        this.$parent.chatRef = this.chatRef;
        
        history.pushState(null, null, `/#${this.chatRef.key}`);
        console.log("create chat", this.chatRef.key);
        
      }
    },

    loadMsg: function() {
      let chatKey = this.chatRef.key;
      let loadRef = this.fb.database()
        .ref('messages')
        .orderByChild("chatKey")
        .equalTo(chatKey);

      loadRef.once('value').then(snapshot => {
        let messageList = [];
        snapshot.forEach(childSnapShot => {
          let data = childSnapShot.val();
          data.key = childSnapShot.key;
          messageList.push(data);
        });

        // sort by date
        messageList.sort((a, b) => {
          if (a.createdAt < b.createdAt) return -1;
          if (a.createdAt > b.breatedAt) return 1;
          return 0;
        });

        // add data
        this.messageList = messageList;

        // start observer
        this.observerMsg();

        // scroll bottom
        this.scrollToBottom();
      });
    },

    observerMsg: function() {
      let _this = this;
      let chatKey = this.chatRef.key;
      let chatRef = this.fb.database()
        .ref("messages")
        .orderByChild("chatKey")
        .equalTo(chatKey);
      chatRef.on("child_added", snapshot => {
          let newMessage = snapshot.val()
          newMessage.key = snapshot.key
          for(var i=0; i < _this.messageList.length; i++) {
              let message = _this.messageList[i];
              if (message.key === newMessage.key) {
                  return;
              }
          }

        _this.messageList.push(newMessage);
        _this.scrollToBottom();
      });
    },

    scrollToBottom :function() {
      let _this = this;     
      setTimeout(() => {
          anime({
              targets: 'main',
              scrollTop: _this.$el.scrollHeight,
              duration: 200,
              easing: "easeInQuad"
          });
      }, 500)
    },

    isMineMsg: function(msg) {
      return this.$parent.user.uid === msg.userId;
    },

    getTime: function(time) {
      return displaytime(time);
    }
  }
}
</script>