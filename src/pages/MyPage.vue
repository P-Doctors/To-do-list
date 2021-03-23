<template>
  <div id="app">
    <!-- <button v-on:click="postTasklist">Make Task</button> -->
    <div>
      <header>自分の名前</header>
      <p v-for="(task,index) in tasks" :key="index">
        {{ task.text }}
        <button v-on:click="deleteTasklist(index)">Delete Task</button>
      </p>
      <button>MAKE TASK<br>(YOUR FRIEND)</button>
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
    // postTasklist() {
    //   const task = {
    //     text: "保存されたタスク"
    //   };
    //   firebase.firestore().collection("tasks")
    //     .add(task)
    //     .then(ref => {
    //       this.tasks.push({
    //         id: ref.id,
    //         ...task
    //       });
    //     });
    // },
    deleteTasklist(index){
      firebase.firestore().collection("tasks").delete()
      this.tasks.splice(index,1)
    }
  },
  created() {
    firebase
      .firestore()
      .collection("tasks")
      .get()
      .then(snapshot => {
        console.log(snapshot)
        snapshot.docs.forEach(doc => {
          console.log("here")
          this.tasks.push({
            id: doc.id,
            ...doc.data()
          });
        });
        console.log(this.tasks)
      });
      
  }
};
</script>