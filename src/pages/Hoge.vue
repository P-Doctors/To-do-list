<template>
  <div>
    <h1>This is Hoge</h1>
    <button v-on:click="create">Submit</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  methods: {
    create() {
      firebase.firestore().collection("tweets").add({
        text: "こんにちは、ツイートの本文です。"
      });
    }
  }
};
</script>

