<template>
  <div>
    <header>
      <div class="todayDate">
        {{ setToday }}
      </div>
      <div class="userName">
        {{ loginUser.displayName }}
      </div>
    </header>
    <main>
      <div class="friendText">
        <h1>Your Friend</h1>
      </div>
      <div class="friendList">
        <div v-for="userProfile in userProfiles" v-bind:key="userProfile.id">
          <p v-on:click="selectFriend(userProfile.id)" class="friendName">
            {{ userProfile.name }}
          </p>
          <div>
            ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
          </div>
        </div>
      </div>
      <router-link to="/mypage" class="button1">MyPage</router-link>
      <button v-on:click="friendMypage" class="button2">
        Make Task
      </button>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      loginUser: {
        displayName: "",
      },
      userProfiles: [],
    };
  },
  methods: {
    // クリックしたら指定した友達のMyPageに移動する
    friendMypage() {
      this.$router.push("/calendar");
    },
    selectFriend(index) {
      console.log(this.loginUser.uid);
      console.log(index);
      if (this.loginUser.uid == index) {
        alert("You can't choose yourself!");
      } else {
        this.$router.push({
          name: "Calendar",
          params: {
            id: index,
          },
        });
      }
    },
  },
  computed: {
    setToday() {
      var hiduke = new Date();
      var month = hiduke.getMonth() + 1;
      var day = hiduke.getDate();
      return month + "/" + day;
    },
  },
  mounted() {
    console.log("called mounted");
    const vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //ログイン済みの場合
        console.log(user);
        console.log(user.displayName);
        console.log(user.uid);
        vm.loginUser.displayName = user.displayName;
        vm.loginUser.uid = user.uid;
      } else {
        //未ログインの場合
        alert("You have to SignIn");
        vm.$router.push({ name: "Home" });
      }
    });
    firebase
      .firestore()
      .collection("user_profiles")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.userProfiles.push({
            id: doc.id,
            name: doc.data().name,
          });
        });
      });
    console.log(this.userProfiles.id);
  },
};
</script>

<style scoped>
header {
  padding: 10px;
  position: relative;
}

.todayDate {
  margin-left: 640px;
  display: inline-block;
  text-align: center;
  font-size: 50px;
}

.userName {
  display: inline-block;
  font-size: 30px;
  margin-left: 480px;
}

main {
  background-color: #67c7d4;
  margin: 0 auto;
  padding: 20px;
  height: 645px;
}

.friendText {
  display: flex;
  justify-content: center;
  font-size: 35px;
}

.friendList {
  margin: 30px 400px 0;
  padding: 20px;
  height: 350px;
  background-color: #ffeed5;
  border-radius: 80px;
  color: black;
  overflow: scroll;
}

.friendName {
  text-align: center;
  font-size: 50px;
  cursor: pointer;
}

.button1 {
  margin-bottom: 30px;
  margin-left: 70px;
  text-align: center;
  padding: 8px 24px;
  display: inline-block;
  text-align: right;
  font-size: 50px;
  opacity: 0.8;
  border-radius: 4px;
  border-bottom: 5px solid #b84c00;
  background-color: orange;
  color: #ffffff;
  text-decoration: none;
}

.button1:active {
  box-shadow: none;
  position: relative;
  top: 7px;
}

.button1:hover {
  opacity: 1;
  margin-top: 3px;
}

.button2 {
  margin-bottom: 30px;
  margin-left: 720px;
  text-align: center;
  padding: 8px 24px;
  display: inline-block;
  text-align: right;
  font-size: 60px;
  opacity: 0.8;
  border-radius: 4px;
  border-bottom: 5px solid #b84c00;
  background-color: orangered;
  color: #ffffff;
  text-decoration: none;
}

.button2:active {
  box-shadow: none;
  position: relative;
  top: 7px;
}

.button2:hover {
  opacity: 1;
  margin-top: 3px;
}

footer {
  height: 50px;
  background-color: #5b5b5b;
}
</style>
