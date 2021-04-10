<template>
  <div>
    <header></header>
    <main>
      <h2 class="signin-text">Please sign in with your Google account!</h2>
      <button v-on:click="signIn" class="button">Sign In</button>
    </main>
    <footer></footer>
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
      console.log(provider);
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

<style scoped>
header {
  padding: 10px;
  height: 90px;
  position: relative;
}

main {
  background-color: #67c7d4;
  margin: 0 auto;
  padding: 50px;
  height: 650px;
  display: flex;
  flex-direction: column;
}

.signin-text {
  display: inline-block;
  margin-top: 60px;
  margin-left: 30px;
  width: 700px;
  font-size: 60px;
  text-align: left;
}

.button {
  margin-top: 80px;
  margin-left: 850px;
  padding: 8px 24px;
  display: inline-block;
  width: 400px;
  font-size: 100px;
  opacity: 0.8;
  border-radius: 4px;
  border-bottom: 5px solid #b84c00;
  background-color: orange;
  color: #ffffff;
  text-decoration: none;
}

.button:active {
  box-shadow: none;
  position: relative;
  top: 7px;
}

.button:hover {
  opacity: 1;
  margin-top: 83px;
}

footer {
  height: 50px;
  background-color: #5b5b5b;
}
</style>
