<template>
  <main-component
    v-if="login" 
    @logout-event="isLogout">
  </main-component>
  <signin-component v-else></signin-component>
</template>

<style lang="css">
  html {
    height: 100%;
  }
  body {
    height: 100%;
    font-family: "Mplus 1p";
  }
</style>

<script>
import main from './main.vue'
import signin from './signin.vue'

export default {
  data: function() {
    return {
      login: false,
      user: null
    }
  },
  created: function() {
    const _this = this;
    this.fb = this.$root.fb;
    this.fb.auth().getRedirectResult().then(function(result) {
      // The signed-in user info.
      let user = result.user;
      if (user !== null) {
        _this.$data.user  = user;
        _this.$data.login = true;
      }
    }).catch(function(error) {
      console.log(error);
    });
  },
  methods: {
    isLogout: function() {
      // reset
      const _this = this;
      this.fb.auth().signOut().then(function() {
        _this.$data.user  = null;
        _this.$data.login = false;
      }, function(error) {
        console.log(error);
      })
    }
  },
  components: {
    /** 子コンポーネントの登録 */
    'main-component': main,
    'signin-component': signin,
  }
}
</script>