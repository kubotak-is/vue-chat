<template>
  <section class="signin">
    <a class="btn-signin"
      @click="onAuth">
      <i class="fa fa-google"></i> SIGNIN
    </a>
  </section>
</template>

<style lang="scss">
  .signin {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    > .btn-signin {
      cursor: pointer;      
      font-weight: bold;
      color: #FFF;
      width: 80%;
      height: 40px;
      text-align: center;
      padding: 9px 0;
      display: block;
      background: #2196F3;

      &:hover {
        background: #1976D2;
      }
    }
  }
</style>

<script>
export default {
  methods: {
    onAuth: function() {
      const fb = this.$root.fb;
      let provider = new fb.auth.GoogleAuthProvider;
      fb.auth().signInWithRedirect(provider);
    }
  }
}
</script>