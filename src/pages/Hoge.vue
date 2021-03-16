<template>
  <div>
    <h1>This is Hoge</h1>
    <input type="text" v-model="tweetText"> 
    <button v-on:click="create">Submit</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data(){
    return {
      col: firebase.firestore().collection("tweets"),

      tweetText: "",
    }
  },

  methods: {
    create() {
      const vm = this
      this.col.add({
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
  }
};
</script>

