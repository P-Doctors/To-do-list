<template>
  <div>
    <header>
      <div class="todayDate">
        {{ setToday }}
      </div>
      <button v-on:click="signOut" class="button1">SignOut</button>
      <div class="userName">
        {{ loginUser.displayName }}
      </div>
    </header>
    <main>
      <h1>Your Task</h1>
      <div class="task-contents">
        <!-- if(loginUser.displayName == user.displayName) -->
        <div v-if="user" class="tweet">
          <div class="new-tweet">
            <div>【 New tweet 】</div>
            <input type="text" v-model="tweetText" />
            <button v-on:click="create">Submit</button>
          </div>
          <hr />
          <div class="selected-tweet">
            <div>【 Selected tweet 】</div>
            <div>ID : {{ selectedTweet.id }}</div>
            <div>Text : <input type="text" v-model="selectedTweet.text" /></div>
            <button v-on:click="update">Update</button>
            <br />
          </div>
          <div>
            ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
          </div>
          <hr />
        </div>
        <div
          class="task-content"
          v-for="(task, index) in tasks"
          v-bind:key="index"
        >
          <!-- <div>【 {{ index }} 】</div>
          <div>ID : {{ document.id }}</div> -->
          <div class="task">
            【{{ index + 1 }}】{{ task }}
            <div>
              <button v-on:click="remove(index)" class="remove-button">
                Remove
              </button>
              <!-- <button v-on:click="edit(document)" class="edit-button">
                Edit
              </button> -->
            </div>
          </div>
          <!-- --- --- --- --- --- --- --- -->
        </div>
      </div>
      <router-link to="/selectuser" class="button2">Make Task</router-link>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      collection: firebase.firestore().collection("tweets"),
      tasks: [],
      selectedTweet: {
        text: "",
        id: "",
      },
      loginUser: {
        displayName: "",
      },
      tweetText: "",
      user: false,
    };
  },

  methods: {
    // Create(新規作成)
    create() {
      const vm = this;
      this.collection
        .add({
          text: this.tweetText,
        })
        .then(function() {
          //tweetのFirestoreへの保存がうまくいったとき
          alert("Tweet completed !!");
          vm.tweetText = "";
        })
        .catch(function(error) {
          //tweetのFirestoreへの保存に失敗したとき
          alert(error);
        });
    },

    // Remove(削除)
    remove(index) {
      this.tasks.splice(index, 1);
      this.collection
        .doc(this.loginUser.uid)
        .set({ text: this.tasks })
        .then(function() {
          alert("Delete completed !!");
        })
        .catch(function(error) {
          alert(error);
        });
    },

    // Update(更新)
    update() {
      const obj = {
        text: this.selectedTweet.text,
      };
      this.collection
        .doc(this.selectedTweet.id)
        .set(obj)
        .then(function() {
          alert("Update completed !!");
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // Editボタンが押されたときに呼ばれる処理
    edit(document) {
      this.selectedTweet.id = document.id;
      this.selectedTweet.text = document.data().text;
    },

    signOut() {
      console.log("called siginOut");
      const vm = this;
      firebase
        .auth()
        .signOut()
        .then(function() {
          alert("SignOut completed");
          vm.$router.push({ name: "Home" });
        });
      // .catch(function(error) {
      //   // alert(error);
      // });
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

  created() {
    //   this.unsubscribe = this.collection.onSnapshot((snapshot) => {
    // this.documents = snapshot.docs;
    //   console.log(this.documents);
    // });
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
        firebase
          .firestore()
          .collection("tweets")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            vm.tasks = snapshot.data().text;
          });
      }
      //  else {
      //   //未ログインの場合
      //   // alert("You have to SignIn");
      //   vm.$router.push({ name: "Home" });
      // }
    });
  },

  // beforeDestroy() {
  //   this.unsubscribe();
  // },
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

.button1 {
  margin-left: 270px;
  padding: 8px 24px;
  display: inline-block;
  text-align: right;
  font-size: 35px;
  opacity: 0.8;
  border-radius: 4px;
  border-bottom: 5px solid #b84c00;
  background-color: orangered;
  color: #ffffff;
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

.userName {
  display: inline-block;
  font-size: 30px;
  margin-left: 40px;
}

main {
  background-color: #67c7d4;
  margin: 0 auto;
  padding: 20px;
  height: 645px;
}

main h1 {
  display: flex;
  justify-content: center;
  font-size: 70px;
}

.tweet {
  margin: 0px 60px;
  display: flex;
  justify-content: center;
}

.task-contents {
  margin-top: 30px;
  height: 350px;
  background-color: #ffeed5;
  border-radius: 80px;
  color: black;
}

.task-content {
  text-align: center;
  display: flex;
  display: inline-block;
}

.task {
  display: flex;
  padding: 10px;
  margin: 20px 40px;
  flex-direction: column;
  color: #ffffff;
  background-color: #cd853f;
  border-radius: 15px;
}

.remove-button {
  background-color: orangered;
  color: #ffffff;
  margin-right: 5px;
}
.button2 {
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 580px;
  text-align: center;
  padding: 8px 24px;
  display: inline-block;
  text-align: right;
  font-size: 40px;
  opacity: 0.8;
  border-radius: 4px;
  border-bottom: 5px solid #b84c00;
  background-color: orange;
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
  margin-top: 33px;
}

footer {
  height: 50px;
  background-color: #5b5b5b;
}
</style>
