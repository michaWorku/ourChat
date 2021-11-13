import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyC_bDmc6hWhxRtlPdodNifiQmO60ionGTc",
    authDomain: "ourchat-c6694.firebaseapp.com",
    projectId: "ourchat-c6694",
    storageBucket: "ourchat-c6694.appspot.com",
    messagingSenderId: "658845207797",
    appId: "1:658845207797:web:b7504c74a46d974b7889bc",
  })
  .auth();
