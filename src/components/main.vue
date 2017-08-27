<template>
  <section id="main">
    <header>
      <nav>
        <section class="left"></section>
        <section class="center">
          <p>{{ user.displayName }}</p>
        </section>
        <section class="right">
          <a @click="onLogout"><i class="fa fa-sign-out" aria-hidden="true"></i></a>
        </section>
      </nav>
    </header>

    <main>
      <message-component></message-component>
    </main>

    <footer>
      <input-component></input-component>
    </footer>
  </section>
</template>

<style lang="scss">
  #main {
    height: 100%;
    display: grid;
    grid-template-rows: 50px 1fr 50px;
    grid-template-columns: 100%;
  }

  header {
    grid-row: 1;
    grid-column: 1;
    background: #263147;

    &> nav {
      display: grid;
      grid-template-rows: 50px;
      grid-template-columns: 50px 1fr 50px;

      text-align: center;
      color: #FFF;
      line-height: 50px;

      & p {
        margin: 0px;
      }

      & a {
        width: 50px;
        height: 50px;
        display: block;
      }

      &> .left {
        grid-row: 1;
        grid-column: 1;
      }

      &> .center {
        grid-row: 1;
        grid-column: 2;
      }

      &> .right {
        grid-row: 1;
        grid-column: 3;
      }
    }
  }

  main {
    grid-row: 2;
    grid-column: 1;
    background: #7193C1;
    overflow: auto;
    box-shadow: 0px 2px 0px 0 rgba(0, 0, 0, 0.2) inset;

    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: #666;
    }
  }

  footer {
    grid-row: 3;
    grid-column: 1;
  }
</style>

<script>
import input from './input.vue'
import message from './message.vue'

export default {
  data: function() {
    return {
      user: {},
      chatRef: null
    }
  },
  created: function() {
    const fb = this.$root.fb;
    // set user
    this.$data.user = this.$parent.user;
  },
  methods: {
    onLogout: function() {
      this.$emit("logout-event");
    }
  },
  components: {
    /** 子コンポーネントの登録 */
    'message-component': message,
    'input-component': input,
  }
}
</script>