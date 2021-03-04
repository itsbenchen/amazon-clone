import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB17LprkTWPb39V41WvaXp1urxMD226lVo",
    authDomain: "clone-f7a06.firebaseapp.com",
    projectId: "clone-f7a06",
    storageBucket: "clone-f7a06.appspot.com",
    messagingSenderId: "353864454877",
    appId: "1:353864454877:web:0cee48bb85addd3cec8134",
    measurementId: "G-YKHRLK5VQC"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db= firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };