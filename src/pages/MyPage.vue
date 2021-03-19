<template>
  <div id="app">
    <button v-on:click="postTasklist">Make Task</button>
    <div>
      <p v-for="task in tasks" :key="task.id">
        {{ task.text }}
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    postTasklist() {
      const task = {
        text: "保存されたタスク"
      };
      firebase.firestore().collection("tasks")
        .add(task)
        .then(ref => {
          this.tasks.push({
            id: ref.id,
            ...task
          });
        });
    }
  },
  created() {
    firebase
      .firestore()
      .collection("tasks")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.tasks.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });
  }
};
</script>