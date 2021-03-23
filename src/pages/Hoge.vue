<template>
  <div>
    <h1>This is Hoge</h1>
    <div>
      <div>【 New tweet 】</div>
      <input type="text" v-model="tweetText"> 
      <button v-on:click="create">Submit</button>
    </div>
    <hr>
    <div>
      <div>【 Selected tweet 】</div>
      <div>ID : {{ selectedTweet.id }}</div> 
      <div>Text : <input type="text" v-model="selectedTweet.text"></div>
      <button v-on:click="update">Update</button>
      <br>
    </div>
    <hr>
    <div v-for="(document, index) in documents" v-bind:key="index">
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
</template>

<script>
import firebase from "firebase";

export default {
  data(){
    return {
      collection: firebase.firestore().collection("tweets"),
      documents: [],
      selectedTweet: {
        text: "",
        id: "",
      },

      tweetText: "",
    }
  },

  methods: {

    // Create(新規作成)
    create() {
      const vm = this
      this.collection.add({
        text: this.tweetText,
      })
      .then(function(){ //tweetのFirestoreへの保存がうまくいったとき
        alert("Tweet completed !!")
        vm.tweetText = ""
      })
      .catch(function(error){ //tweetのFirestoreへの保存に失敗したとき
        alert(error)
      });
    },

    // Remove(削除)
    remove(document) {
      this.collection.doc( document.id )
        .delete()
        .then(function(){
          alert("Delete completed !!")
        })
        .catch(function(error){
          alert(error)
        })
    },

    // Update(更新)
    update() {
      const obj = {
        text: this.selectedTweet.text,
      }
      this.collection.doc( this.selectedTweet.id )
        .set(obj)
        .then(function(){
          alert("Update completed !!")
        })
        .catch(function(error){
          console.log(error)
        })
    },

    // Editボタンが押されたときに呼ばれる処理
    edit(document){
      this.selectedTweet.id = document.id
      this.selectedTweet.text = document.data().text
    },

  },

  created() {
    const vm = this
    this.unsubscribe = this.collection.onSnapshot(function(snapshot){
      vm.documents = snapshot.docs
      console.log(vm.documents)
    })
  },

  beforeDestroy() {
    this.unsubscribe()
  }
};
</script>

