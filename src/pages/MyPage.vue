<template>
  <div>
    <header>
      <div class="userName">
        {{ loginUser.displayName }}
      </div>
      <button v-on:click="signOut">SignOut</button>
    </header>
    <main>
      <h1>Your Task</h1>
      <div class="task-contents">
        <div>
          <div>【 New tweet 】</div>
          <input type="text" v-model="tweetText" />
          <button v-on:click="create">Submit</button>
        </div>
        <hr />
        <div>
          <div>【 Selected tweet 】</div>
          <div>ID : {{ selectedTweet.id }}</div>
          <div>Text : <input type="text" v-model="selectedTweet.text" /></div>
          <button v-on:click="update">Update</button>
          <br />
        </div>
        <hr />
        <div
          class="task-content"
          v-for="(document, index) in documents"
          v-bind:key="index"
        >
          <div>【 {{ index }} 】</div>
          <div>ID : {{ document.id }}</div>
          <div>Text : {{ document.data().text }}</div>
          <div>
            <button v-on:click="remove(document)">Remove</button>
            <button v-on:click="edit(document)">Edit</button>
          </div>
          --- --- --- --- --- --- ---
        </div>
      </div>
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
      documents: [],
      selectedTweet: {
        text: "",
        id: "",
      },
      loginUser: {
        displayName: "",
      },
      tweetText: "",
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
    remove(document) {
      this.collection
        .doc(document.id)
        .delete()
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
        })
        .catch(function(error) {
          alert(error);
        });
    },
  },

  created() {
    const vm = this;
    this.unsubscribe = this.collection.onSnapshot(function(snapshot) {
      vm.documents = snapshot.docs;
      console.log(vm.documents);
    });
  },

  mounted() {
    console.log("called mounted");
    const vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //ログイン済みの場合
        console.log(user);
        console.log(user.displayName);
        vm.loginUser.displayName = user.displayName;
      } else {
        //未ログインの場合
        alert("You have to SignIn");
        vm.$router.push({ name: "Home" });
      }
    });
  },

  beforeDestroy() {
    this.unsubscribe();
  },
};
</script>

<style scoped>
header {
  padding: 10px;
  position: relative;
  text-align: right;
}

.userName {
  font-size: 30px;
}

main {
  background-color: #67c7d4;
  margin: 0 auto;
  padding: 20px;
  height: 680px;
}

main h1 {
  display: flex;
  justify-content: center;
  font-size: 70px;
}

.task-contents {
  background-color: blue;
}

.task-content {
  text-align: center;
}

footer {
  height: 50px;
  background-color: #5b5b5b;
}
</style>
