import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// // development
// var config = {
//   apiKey: "AIzaSyAA2pq9_3gvrzaOryLT1SxV6G4AIJZxXEY",
//   authDomain: "disal-5ba8c.firebaseapp.com",
//   databaseURL: "https://disal-5ba8c.firebaseio.com",
//   projectId: "disal-5ba8c",
//   storageBucket: "disal-5ba8c.appspot.com",
//   messagingSenderId: "140142080509",
//   appId: "1:140142080509:web:1bdd0dedc0762cfa"
// };

// production
var config = {
  apiKey: "AIzaSyAswb8Qh0bPEB1GiIhGVbzLn7yjuAitY7U",
  authDomain: "markdown-editor-e6f23.firebaseapp.com",
  databaseURL: "https://markdown-editor-e6f23.firebaseio.com",
  projectId: "markdown-editor-e6f23",
  storageBucket: "markdown-editor-e6f23.appspot.com",
  messagingSenderId: "38394383787",
  appId: "1:38394383787:web:9b0b1d1483be74475096ee"
};

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const Auth = firebase.auth();
export const Database = firestore;
export const Storage = firebase.storage();
export const Firebase = firebase;
export default firebase;
