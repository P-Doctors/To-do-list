<template>
  <div class="contents">
    <header>
      <div class="todayDate">
        {{setToday}}
      </div>
      <router-link to="/auth" class="button1">Sign in</router-link>
      <router-link to="/auth" class="button2">Log in</router-link>
    </header>
    <main>
      <h1>TO DO LIST</h1>
      <p class="mainText">
        <b>普通のTodolistに見えるけど、一味違うTodolist<br>
        何が違うのか興味がある人は下のStartボタンをクリック！</b>
      </p>
      <router-link to="/auth" class="button3">START</router-link>
      <i class="fas fa-hand-point-up faa-bounce animated"></i>
    </main> 
    <footer></footer>  
  </div>
</template>

<script>
export default {
  computed: {
    setToday() {
      var hiduke = new Date();
      var month = hiduke.getMonth() + 1;
      var day = hiduke.getDate();
      return month + "/" + day;
    },
  },
};
</script>

<style scoped>
  header{
    padding: 10px;
    position: relative;
  }

  .todayDate{
    display: flex;
    justify-content: center;
    font-size: 50px;
  }

  .button1{
    padding: 8px 24px;
    position: absolute;
    display: inline-block;
    top: 15px;
    right: 10px;
    font-size: 35px;
    opacity: 0.8;
    border-radius: 4px;
    border-bottom: 5px solid #b84c00;
    background-color: orangered;
    color:#ffffff;
    text-decoration: none;
  }

  .button2{
    padding: 8px 24px;
    position: absolute;
    display: inline-block;
    top: 15px;
    right: 200px;
    font-size: 35px;
    opacity: 0.8;
    border-radius: 4px;
    border-bottom: 5px solid #b84c00;
    background-color: orange;
    color:#ffffff;
    text-decoration: none;
  }

  .button3{
    margin: 80px 500px 0 500px;
    padding: 8px 24px;
    display: inline-block;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 60px;
    opacity: 0.8;
    border-radius: 4px;
    border-bottom: 5px solid #b84c00;
    background-color: orange;
    color:#ffffff;
    text-decoration: none;
  }

  .button1:active {
    box-shadow: none;
    position: relative;
    top: 7px;
  }

  .button2:active {
    box-shadow: none;
    position: relative;
    top: 7px;
  }

  .button3:active {
    box-shadow: none;
    position: relative;
    top: 7px;
  }

  .button1:hover {
    opacity: 1;
    margin-top: 3px;
  }

  .button2:hover {
    opacity: 1;
    margin-top: 3px;
  }

  .button3:hover {
    opacity: 1;
    margin-top: 83px;
  }

  main{
    background-color: #67c7d4;
    margin: 0 auto;
    padding: 50px;
    height: 650px;
  }

  main h1{
    display: flex;
    justify-content: center;
    font-size: 100px
  }

  .mainText{
    margin: 50px auto;
    font-size: 30px;
    text-align: center;
  }

  i{
    font-size: 50px;
    position: absolute;
    top: 600px;
    left: 800px;
  }
  footer{
    height: 50px;
    background-color: #5b5b5b;
  }
</style>

// <template>
//   <div>
//     <header>
//       <div>=== === === === ===</div>
//       <div>今日の日付 : </div>
//       <div>UserName : {{ loginUser.displayName }}</div>
//       <button v-on:click="signOut">SignOut</button>
//       <div>=== === === === ===</div>

//     </header>
//     <h1>TO DO LIST</h1>
//     <button>START</button>
//   </div>
// </template>

// <script>
// import firebase from "firebase";

// export default {
//   data(){
//     return{
//       loginUser: {
//         displayName: "",
//       },
//     }
//   },

//   methods: {
//     signOut() {
//       console.log("called siginOut")
//       const vm = this
//       firebase.auth().signOut()
//         .then(function(){
//           alert("SignOut completed")
//           vm.$router.push({name: "SignIn"})
//         })
//         .catch(function(error){
//           alert(error)
//         })
//     },
//   },

//   mounted() {
//     console.log("called mounted")
//     const vm = this
//     firebase.auth().onAuthStateChanged(function(user){
//       if(user){ //ログイン済みの場合
//         console.log(user)
//         console.log(user.displayName)
//         vm.loginUser.displayName = user.displayName
//       }
//       else{ //未ログインの場合
//         alert("You have to SignIn")
//         vm.$router.push({name: "SignIn"})
//       }
//     })
//   },

  
// }
// </script>