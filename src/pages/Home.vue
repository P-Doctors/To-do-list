<template>
  <div>
    <header>
      <div>=== === === === ===</div>
      <div>今日の日付 : </div>
      <div>UserName : {{ loginUser.displayName }}</div>
      <button v-on:click="signOut">SignOut</button>
      <div>=== === === === ===</div>

    </header>
    <h1>TO DO LIST</h1>
    <button>START</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data(){
    return{
      loginUser: {
        displayName: "",
      },
    }
  },

  methods: {
    signOut() {
      console.log("called siginOut")
      const vm = this
      firebase.auth().signOut()
        .then(function(){
          alert("SignOut completed")
          vm.$router.push({name: "SignIn"})
        })
        .catch(function(error){
          alert(error)
        })
    },
  },

  mounted() {
    console.log("called mounted")
    const vm = this
    firebase.auth().onAuthStateChanged(function(user){
      if(user){ //ログイン済みの場合
        console.log(user)
        console.log(user.displayName)
        vm.loginUser.displayName = user.displayName
      }
      else{ //未ログインの場合
        alert("You have to SignIn")
        vm.$router.push({name: "SignIn"})
      }
    })
  },

  
}
</script>