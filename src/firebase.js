import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCThtCJlGGngeIBhYdyldjuzBnY6gIrAY0",
  authDomain: "firestorepractice-d8dbf.firebaseapp.com",
  databaseURL: "https://firestorepractice-d8dbf.firebaseio.com",
  projectId: "firestorepractice-d8dbf",
  storageBucket: "firestorepractice-d8dbf.appspot.com",
  messagingSenderId: "254606928001",
  appId: "1:254606928001:web:41a60f43d47268e2118580"
};

firebase.initializeApp(firebaseConfig);