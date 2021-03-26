<template>
  <div>
    <h1>This is SignIn</h1>
    <button v-on:click="signIn">Sign In With Google</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      isAuth: false,
    };
  },

  methods: {
    signIn() {
      console.log("called siginIn");
      const provider = new firebase.auth.GoogleAuthProvider();

      const vm = this;
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(response) {
          console.log(response);
          vm.$router.push({ name: "MyPage" });
        });
    },
  },

  mounted() {
    console.log("called mounted");
    const vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //ログイン済みの場合
        alert("ログイン済み");
        vm.$router.push({ name: "MyPage" });
      } else {
        //未ログインの場合
      }
    });
  },
};
</script>
